/*Add any dependency in []*/
angular.module('EigenFaces', [
    'ui.router', 'HomeController', 'fetchImagesService'
])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('main', {
                url: '',
                //activates automatically when one of the descendents are activated
                abstract: true,
                templateUrl: '/ngApp/navbar.html'

            })
            .state('main.home', {
                url: '/home?start&end',
                //provide default values.This is done for navbar clicks
                params: {
                    start: {
                        value: '1'
                    },
                    end: {
                        value: '9'
                    }
                },
                controller: 'homeController',
                templateUrl: '/ngApp/home.html',
                resolve: {
                    data: function (fetchImagesService, $stateParams) {
                        start = $stateParams["start"];
                        end = $stateParams["end"];
                        //fetch images for right half of screen before loading
                        return fetchImagesService.fetchImages(start, end);
                    },
                }
            })
            // .state('main.svd', {
            //     url: '/svd',
            //     controller: buildTempController(),
            //     template: 'hi'
            // })
            // .state('main.resources', {
            //     url: '/resources',
            //     controller: buildTempController(),
            //     template: 'resources'
            // })
            ;
        //This is required for removing # from urls
        $locationProvider.html5Mode(true);
        //This is used when initial page is loaded ie 127.0.0.1:8000/
        $urlRouterProvider.otherwise('/home?start=1&end=9');
    }])

function buildTempController(name) {
    return function () { }
}

