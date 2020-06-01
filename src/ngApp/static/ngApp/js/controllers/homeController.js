app = angular.module('HomeController', ['splitLeft', 'splitRight'])

app.controller('homeController', function ($scope, $stateParams, data) {
    $scope.start = $stateParams.start;
    $scope.end = $stateParams.end;
    $scope.total = parseInt(data["total"]);
    $scope.images = data["images"];
    $scope.image = $scope.images[0]
    $scope.changeMainImage = function (image) {
        $scope.image = image;
    }
});