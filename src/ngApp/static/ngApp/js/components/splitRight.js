angular.module('splitRight', ['splitRightController'])
    .component('splitRight', {
        templateUrl: 'ngApp/splitRight.html',
        controller: 'splitRightController',
        bindings: {
            start: '<',
            end: '<',
            total: '<',
            images: '<',
            changeMainImage: '&'
        }
    })