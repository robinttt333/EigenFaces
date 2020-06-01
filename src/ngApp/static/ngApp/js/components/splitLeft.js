angular.module('splitLeft', [
    'splitLeftController'
])
    .component('splitLeft', {
        templateUrl: 'ngApp/splitLeft.html',
        controller: 'splitLeftController',
        bindings: {
            image: '='
        }
    })