angular.module('mainImage', [])
    .directive('mainImage', function () {

        function link(scope, element) {
            var canvas = element.find('canvas')[0]
            var ctx = canvas.getContext('2d');



            scope.$watch('pixels', function () {
                if (scope.pixels.length > 0) {
                    changeWeights(scope.pixels);
                }
            });

            function changeWeights(pixels) {
                /*
                https://stackoverflow.com/questions/22823752/creating-image-from-array-in-javascript-and-html5
                */
                var can2 = document.createElement('canvas');
                can2.width = 64;
                can2.height = 64;
                buffer = new Uint8ClampedArray(can2.width * can2.height * 4); // have enough bytes
                for (var y = 0; y < can2.height; y++) {
                    for (var x = 0; x < can2.width; x++) {
                        var pos = (y * can2.width + x) * 4; // position in buffer based on x and y
                        buffer[pos] = pixels[y][x]           // some R value [0, 255]
                        buffer[pos + 1] = pixels[y][x];           // some G value
                        buffer[pos + 2] = pixels[y][x];           // some B value
                        buffer[pos + 3] = 255;           // set alpha channel
                    }
                }
                ctx2 = can2.getContext('2d');
                var idata = ctx2.createImageData(can2.width, can2.height);
                idata.data.set(buffer);
                ctx2.putImageData(idata, 0, 0);
                ctx.drawImage(can2, 0, 0, canvas.clientWidth, canvas.clientHeight);
                can2.remove();
            }
        }


        return {
            scope: {
                name: '=',
                pixels: '='
            },
            templateUrl: '/ngApp/mainImage.html',
            link: link
        };
    })