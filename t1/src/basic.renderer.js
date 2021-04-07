(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.BasicRenderer = {}));
}(this, (function (exports) { 'use strict';


    /* ------------------------------------------------------------ */

    function ear_clipping(primitive) {

        primitive.triangles = [];

        let vertices = primitive.vertices;

        let i = 0;
        while(vertices.length >= 3) {
            const prevVert = i-1 >= 0 ? vertices[i-1] : vertices[vertices.length-1];
            const nextVert = i+1 < vertices.length ? vertices[i+1] : vertices[0];

            const vectorA = prevVert.map((c, index) => c - vertices[i][index]);
            const vectorB = nextVert.map((c, index) => c - vertices[i][index]);

            if(angle_between(vectorA, vectorB) < Math.PI && !exists_vertice_inside_triangle(vertices, [prevVert, vertices[i], nextVert])) {
                primitive.triangles.push([prevVert, vertices[i], nextVert]);
                vertices.splice(i, 1);
                i = 0;
            }
            else {
                i++;
            }  
        }
    }

    function scalar_product(a, b) {
        return a[0]*b[0] + a[1]*b[1];
    }

    function cross_product(a, b) {
        return a[0]*b[1] - a[1]*b[0];
    }

    function angle_between(a, b) {
        const moduleProduct = Math.sqrt(a[0]*a[0] + a[1]*a[1]) * Math.sqrt(b[0]*b[0] + b[1]*b[1]);

        const cos =  scalar_product(a, b) / moduleProduct;

        return Math.acos(cos);
    }

    function exists_vertice_inside_triangle(vertices, triangle) {
        
        for (var v of vertices) {
            
            const vectorA = [v[0]-triangle[0][0], v[1] - triangle[0][1]];
            const vectorEdgeA = [triangle[1][0]-triangle[0][0], triangle[1][1] - triangle[0][1]];

            const vectorB = [v[0]-triangle[1][0], v[1] - triangle[1][1]];
            const vectorEdgeB = [triangle[2][0]-triangle[1][0], triangle[2][1] - triangle[1][1]];

            const vectorC = [v[0]-triangle[2][0], v[1] - triangle[2][1]];
            const vectorEdgeC = [triangle[0][0]-triangle[2][0], triangle[0][1] - triangle[2][1]];

            if(cross_product(vectorEdgeA, vectorA) > 0 &&
                cross_product(vectorEdgeB, vectorB) > 0 &&
                cross_product(vectorEdgeC, vectorC) > 0)
                    return true;

        }

        return false;
    }

    function process_circle(primitive){
        primitive.vertices = [primitive.center];

        const h = primitive.center[0];
        const k = primitive.center[1];
        for (let i = 0; i < 2 * Math.PI ; i+=Math.PI/16 ) {
            const x1 = primitive.radius * Math.cos(i) + h;
            const x2 = primitive.radius * Math.sin(i) + k;
            
            primitive.vertices.push([x1, x2]);
        }
    }

    function apply_xform(primitive) {
        const A = primitive.xform;

        for (let i = 0; i < primitive.vertices.length; i++) {
            const p = [...primitive.vertices[i], 1];
            
            const q = [];
            for (let j = 0; j < 3; j++) 
                q.push(A[j][0]*p[0] + A[j][1]*p[1] + A[j][2]*p[2]);
            
            primitive.vertices[i] = [q[0], q[1]];
        }
    }
        
    function inside(  x, y, primitive  ) {
            // You should implement your inside test here for all shapes   
            // for now, it only returns a false test
            const v = [x, y];

            for (var triangle of primitive.triangles){
                
                const vectorA = [v[0]-triangle[0][0], v[1] - triangle[0][1]];
                const vectorEdgeA = [triangle[1][0]-triangle[0][0], triangle[1][1] - triangle[0][1]];

                const vectorB = [v[0]-triangle[1][0], v[1] - triangle[1][1]];
                const vectorEdgeB = [triangle[2][0]-triangle[1][0], triangle[2][1] - triangle[1][1]];

                const vectorC = [v[0]-triangle[2][0], v[1] - triangle[2][1]];
                const vectorEdgeC = [triangle[0][0]-triangle[2][0], triangle[0][1] - triangle[2][1]];

                if(cross_product(vectorEdgeA, vectorA) > 0 &&
                    cross_product(vectorEdgeB, vectorB) > 0 &&
                    cross_product(vectorEdgeC, vectorC) > 0)
                        return true;
            }

            return false;
    }
        
    
    function Screen( width, height, scene ) {
        this.width = width;
        this.height = height;
        this.scene = this.preprocess(scene);   
        this.createImage(); 
    }

    Object.assign( Screen.prototype, {

            preprocess: function(scene) {
                // Possible preprocessing with scene primitives, for now we don't change anything
                // You may define bounding boxes, convert shapes, etc
                
                var preprop_scene = [];

                for( var primitive of scene ) {  
                    // do some processing
                    // for now, only copies each primitive to a new list

                    preprop_scene.push( primitive );
                    
                }

                
                return preprop_scene;
            },

            createImage: function() {
                this.image = nj.ones([this.height, this.width, 3]).multiply(255);
            },

            rasterize: function() {
                var color;
         
                // In this loop, the image attribute must be updated after the rasterization procedure.
                for( var primitive of this.scene ) {

                    if(primitive.shape === "circle")
                        process_circle(primitive); 

                    if(primitive.hasOwnProperty("xform"))
                        apply_xform(primitive);

                    ear_clipping(primitive);

                    // Loop through all pixels
                    // Use bounding boxes in order to speed up this loop
                    for (var i = 0; i < this.width; i++) {
                        var x = i + 0.5;
                        for( var j = 0; j < this.height; j++) {
                            var y = j + 0.5;

                            // First, we check if the pixel center is inside the primitive 
                            if ( inside( x, y, primitive ) ) {
                                // only solid colors for now
                                color = nj.array(primitive.color);
                                this.set_pixel( i, this.height - (j + 1), color );
                            }
                            
                        }
                    }
                }
                
               
              
            },

            set_pixel: function( i, j, colorarr ) {
                // We assume that every shape has solid color
         
                this.image.set(j, i, 0,    colorarr.get(0));
                this.image.set(j, i, 1,    colorarr.get(1));
                this.image.set(j, i, 2,    colorarr.get(2));
            },

            update: function () {
                // Loading HTML element
                var $image = document.getElementById('raster_image');
                $image.width = this.width; $image.height = this.height;

                // Saving the image
                nj.images.save( this.image, $image );
            }
        }
    );

    exports.Screen = Screen;
    
})));

