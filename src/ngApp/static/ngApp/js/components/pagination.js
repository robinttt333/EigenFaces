angular.module('pagination', ['paginationController'])
    .component('pagination', {
        controller: 'paginationController',
        templateUrl: 'ngApp/pagination.html',
        bindings: {
            start: '<',
            end: '<',
            total: '<'
        }
    })