var size = 200;
var gray_img;
var img_load_flag = false;

function loadImage(src) {
    var $image = new Image();
    $image.crossOrigin = 'Anonymous';
    $image.onload = function () {
        var W, H;
        if ($image.width < $image.height) {
            W = ~~(size * $image.width / $image.height);
            H = ~~(size);
        }
        else {
            H = ~~(size * $image.height / $image.width);
            W = ~~(size);
        }
        
        // load images
        var img = nj.images.rgb2gray(nj.images.read($image));
        gray_img = nj.images.resize(img, H, W);

        // display images in canvas
        var $gray_img = document.getElementById('original');
        $gray_img.width = W; $gray_img.height = H;
        nj.images.save(gray_img, $gray_img);


        /*
        var start = new Date().valueOf();
        var $transformed = document.getElementById('transformed');
        $transformed.width = W; $transformed.height = H;
        nj.images.save(trasformed, $transformed);
        var duration = new Date().valueOf() - start;
        document.getElementById('duration').textContent = '' + duration;
        */
        img_load_flag = true;

        document.getElementById('h').textContent = '' + gray_img.shape[0];
        document.getElementById('w').textContent = '' + gray_img.shape[1];

    };

    $image.src = src;
}

function handleFileSelect(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        loadImage(e.target.result);
    };
    reader.readAsDataURL(file);
}


document.getElementById('file').addEventListener('change', handleFileSelect, false);