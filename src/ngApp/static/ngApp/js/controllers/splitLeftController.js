angular.module('splitLeftController', ['pagination', 'fetchEigenFace', 'mainImage'])
    .controller('splitLeftController', function ($scope, fetchEigenFace) {
        /*We change the $scope.name only when a new image is brought and not when it is updated
        using Eigenface function call because the returned image name is unique so that
        it is  not cached if repeated calls are made to the server.
        */
        var vm = this;
        $scope.pixels = []

        /*Whenever the user clicks on an image on right split screen,it should be
        reflected here also and since the right screen inherits this from the parent
        we first update the image in the home state and then since left-split component
        is its child we just watch for changes on that variable.
        */

        //This function is called when this page loads and val contains 
        //the val as it is eg Zinadene_Zidane.png
        $scope.$parent.$watch('image', function (val) {
            $scope.name = val.split(".")[0].split("_").join(" ")
            fetchEigenFace.eigenFace(val).then(function (data) {
                $scope.path = 'static/ngApp/img/celebs/' + data['image'];
                $scope.list = data["list"]
                $scope.weights = data["weights"]
                $scope.pixels = data["image"]
            });
        })

        //$scope.path = 'static/ngApp/img/celebs/' + $scope.image;
        $scope.vectors = [...Array(10).keys()].map(i => i + + 1)
        $scope.eigenFace = function () {
            img = $scope.name.split(" ").join("_") + ".png"
            data = {
                'img': img,
                'weights': $scope.weights
            }
            fetchEigenFace.updateEigenFace(data).then(function (data) {
                $scope.pixels = data.image;
            });

        }

        $scope.callMe = function () {
            console.log("changed")
        }
    })