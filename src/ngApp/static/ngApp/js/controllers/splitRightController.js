angular.module('splitRightController', [])
    .controller('splitRightController', function ($scope) {
        var vm = this;
        $scope.start = vm.start;
        $scope.end = vm.end;
        $scope.total = vm.total;
        $scope.images = vm.images;
        $scope.changeMainImage = vm.changeMainImage;
        $scope.getNameFromImage = function (image) {
            return image.split(".")[0].split("_").join(" ");
        }
        $scope.getImagePath = function (image) {
            return 'static/ngApp/img/celebs/' + image;
        }
        $scope.imageClicked = function (newImage) {
            $scope.changeMainImage({ image: newImage });
        }

    })