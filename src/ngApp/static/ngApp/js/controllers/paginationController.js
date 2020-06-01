angular.module('paginationController', [])
    .controller('paginationController', function ($scope, $state) {
        /*
            start : Number corresponding to the first image on page
            end : Number corresponding to the last image on page        
            total : Total images on server
            prevDisabled : Boolean 
            nextDisabled : Boolean
            perPage : Number of images in 1 page
            activePage : The active page or the page the user is currently viewing
            startPage : The page to the right of prev button in pagination
            endPage : The page to the left of next button in pagination
            pages : Total pages b/w prev and next button,(10 here) 

        */

        var vm = this;
        $scope.start = parseInt(vm.start);
        $scope.end = parseInt(vm.end);
        $scope.total = parseInt(vm.total);
        $scope.prevDisabled = 1 == $scope.start;
        $scope.nextDisabled = $scope.total == $scope.end;
        $scope.perPage = $scope.end - $scope.start + 1;
        //generate a list of pages    

        $scope.activePage = parseInt($scope.start / $scope.perPage) + 1;
        $scope.startPage = $scope.activePage % 10 ? parseInt($scope.activePage / 10) * 10 + 1 : $scope.activePage - 9;
        $scope.endPage = $scope.activePage % 10 ? Math.min((parseInt($scope.activePage / 10) + 1) * 10, parseInt(($scope.total - $scope.end) / $scope.perPage) + 1 + $scope.activePage) : $scope.activePage;
        //Array of page numbers
        //map function transforms [1,2,3,4...10] ---> [31,32,33...40] and vice versa 
        $scope.pages = [...Array($scope.endPage - $scope.startPage + 1).keys()].map(i => i + $scope.startPage - 1)

        $scope.next = function () {
            $state.go('main.home', {
                'start': $scope.end + 1,
                /*If we have 10 images per page and we goto last page,
                 there may be only say 4 images left*/
                'end': Math.min($scope.total, $scope.end + $scope.perPage)
            })
        }

        $scope.prev = function () {
            $state.go('main.home', {
                'start': $scope.start - $scope.perPage,
                'end': $scope.start - 1
            })
        }

        $scope.gotoPage = function (page) {
            page = parseInt(page) - 1;
            $state.go('main.home', {
                'start': page * $scope.perPage + 1,
                /*If we have 10 images per page and we goto last page,
                 there may be only say 4 images left*/
                'end': Math.min($scope.total, page * $scope.perPage + $scope.perPage)
            })
        }
    })