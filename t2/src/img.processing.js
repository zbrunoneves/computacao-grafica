(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.ImageProcessing = {}));
}(this, (function (exports) { 'use strict';



    function ImageProcesser(img, kernel = null, xform = null, bhandler = 'icrop') {
        this.img = img.clone();
        this.width = img.shape[1];
        this.height = img.shape[0];
        this.kernel = kernel;
        this.xform = xform;
        this.bhandler = bhandler;
    }

    Object.assign( ImageProcesser.prototype, {

        apply_kernel: function(border = 'icrop') {
            // Method to apply kernel over image
            // border: 'icrop' is for cropping image borders, 'extend' is for extending image border
            
            var image = this.img.clone();
            
            var first_x_pixel = 1;
            var last_x_pixel = this.height - 1;
            var first_y_pixel = 1;
            var last_y_pixel = this.width - 1;

            if(border == 'extend') {
                first_x_pixel = 0;
                last_x_pixel = this.height;
                first_y_pixel = 0;
                last_y_pixel = this.width;
            }
            
            for (let i = first_x_pixel; i < last_x_pixel; i++) {
                for (let j = first_y_pixel; j < last_y_pixel; j++) {

                    if(this.kernel == 'box') {
                        var pixel = this.box(i, j);
                        image.set(i, j, pixel);
                    }
                    else if(this.kernel == 'sobel') {
                        var pixel = this.sobel(i, j);
                        image.set(i, j, pixel);
                    }
                    else if(this.kernel == 'laplace') {
                        var pixel = this.laplace(i, j);
                        image.set(i, j, pixel);
                    }
                }
            }

            this.img = image;
        },

        box: function(i, j) {

            var sum =   this.img.get(i-1<0?i:i-1, j-1<0?j:j-1) +
                        this.img.get(i-1<0?i:i-1, j) +
                        this.img.get(i-1<0?i:i-1, j+1==this.width?j:j+1) +
                        this.img.get(i, j-1<0?j:j-1) +
                        this.img.get(i, j) +
                        this.img.get(i, j+1==this.width?j:j+1) +
                        this.img.get(i+1==this.height?i:i+1, j-1<0?j:j-1 )+
                        this.img.get(i+1==this.height?i:i+1, j) +
                        this.img.get(i+1==this.height?i:i+1, j+1==this.width?j:j+1);

            return Math.round(sum/9);
        },

        sobel: function(i, j) {

            var Gx =  this.img.get(i-1<0?i:i-1, j-1<0?j:j-1) * (-1) +
                        this.img.get(i-1<0?i:i-1, j+1==this.width?j:j+1) +
                        this.img.get(i, j-1<0?j:j-1) * (-2) +
                        this.img.get(i, j+1==this.width?j:j+1) * (2) +
                        this.img.get(i+1==this.height?i:i+1, j-1<0?j:j-1) * (-1) +
                        this.img.get(i+1==this.height?i:i+1, j+1==this.width?j:j+1);
            Gx /= 8;

            var Gy =  this.img.get(i-1<0?i:i-1, j-1<0?j:j-1) +
                        this.img.get(i-1<0?i:i-1, j) * (2)+
                        this.img.get(i-1<0?i:i-1, j+1==this.width?j:j+1) +
                        this.img.get(i+1==this.height?i:i+1, j-1<0?j:j-1) * (-1) +
                        this.img.get(i+1==this.height?i:i+1, j) * (-2) +
                        this.img.get(i+1==this.height?i:i+1, j+1==this.width?j:j+1) * (-1);
            Gy /= 8;

            return Math.sqrt(Math.pow(Gx, 2) + Math.pow(Gy, 2));
        },

        laplace: function(i, j) {

            var sum =   this.img.get(i-1<0?i:i-1, j) * (-1) +
                        this.img.get(i, j-1<0?j:j-1) * (-1) +
                        this.img.get(i, j) * (4)+
                        this.img.get(i, j+1==this.width?j:j+1) * (-1)+
                        this.img.get(i+1==this.height?i:i+1, j) * (-1);

            return Math.round(sum/4);
        },

        apply_xform: function()  {
            // Method to apply affine transform through inverse mapping 

            var xform_img = nj.images.read(new Image(this.width, this.height));

            var inverse_xform = this.inverse(this.to_matrix(this.xform));

            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    
                    var vector = nj.array([i, j, 1]);

                    var orginal_coords = nj.dot(nj.array(inverse_xform), vector);

                    const x = Math.round(orginal_coords.get(0));
                    const y = Math.round(orginal_coords.get(1));

                    xform_img.set(i, j, this.img.get(x, y));
                }
            }

            this.img = xform_img;
        },

        inverse: function(a) {
            var n = a.length;
            var x = this.new_matrix(n);
            var b = this.new_matrix(n);
            var index = this.new_array(n);


            for (var i=0; i<n; ++i) 
                b[i][i] = 1;

            [a, index] = this.gaussian(a, index, n);

            for (var i=0; i<n-1; ++i)
                for (var j=i+1; j<n; ++j)
                    for (var k=0; k<n; ++k)
                        b[index[j]][k] -= a[index[j]][i]*b[index[i]][k];

            for (var i=0; i<n; ++i)  {
                x[n-1][i] = b[index[n-1]][i]/a[index[n-1]][n-1];
                for (var j=n-2; j>=0; --j)  {
                    x[j][i] = b[index[j]][i];
                    for (var k=j+1; k<n; ++k) {
                        x[j][i] -= a[index[j]][k]*x[k][i];
                    }
                    x[j][i] /= a[index[j]][j];
                }
            }

            return x;
        },

        gaussian: function(a, index, n) {
            var c = this.new_array(n);
            
            for (var i=0; i<n; ++i) 
                index[i] = i;

            for (var i=0; i<n; ++i)  {
                var c1 = 0;
                for (var j=0; j<n; ++j)  {
                    var c0 = Math.abs(a[i][j]);
                    if (c0 > c1) c1 = c0;
                }
                c[i] = c1;
            }

            var k = 0;
            for (var j=0; j<n-1; ++j) {
                var pi1 = 0;
                for (var i=j; i<n; ++i) {
                    var pi0 = Math.abs(a[index[i]][j]);
                    pi0 /= c[index[i]];
                    if (pi0 > pi1) {
                        pi1 = pi0;
                        k = i;
                    }
                }

                var itmp = index[j];
                index[j] = index[k];
                index[k] = itmp;
                for (var i=j+1; i<n; ++i) {
                    var pj = a[index[i]][j]/a[index[j]][j];

                    a[index[i]][j] = pj;

                    for (var l=j+1; l<n; ++l)
                        a[index[i]][l] -= pj*a[index[j]][l];
                }
            }

            return [a, index];

        },

        to_matrix: function(a) {
            var matrix = [];
            for(var i=0; i<3; i++) {
                matrix[i] = [];
                for(var j=0; j<3; j++) {
                    matrix[i][j] = a.get(i, j);
                }
            }

            return matrix;
        },

        new_matrix: function(n) {
            var matrix = [];
            for(var i=0; i<n; i++) {
                matrix[i] = [];
                for(var j=0; j<n; j++) {
                    matrix[i][j] = 0;
                }
            }

            return matrix;
        },

        new_array: function(n) {
            var array = [];
            for(var i=0; i<n; i++) {
                array[i] = 0;
            }

            return array;
        },

        update: function() {
            // Method to process image and present results
            var start = new Date().valueOf();

            if(this.kernel != null) {
                this.apply_kernel(this.bhandler);
            }

            if(this.xform != null) {
                this.apply_xform();
            }

            // Loading HTML elements and saving
            var $transformed = document.getElementById('transformed');
            $transformed.width = this.width; 
            $transformed.height = this.height;
            nj.images.save(this.img, $transformed);
            var duration = new Date().valueOf() - start;
            document.getElementById('duration').textContent = '' + duration;
        }

    } )


    exports.ImageProcesser = ImageProcesser;
    
    
})));

