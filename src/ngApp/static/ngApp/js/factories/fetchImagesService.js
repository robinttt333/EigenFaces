angular.module('fetchImagesService', [])
    .factory('fetchImagesService', function ($http) {
        return {
            fetchImages: function (start, end) {
                var req = {
                    method: 'GET',
                    url: '/getImages',
                    params: { 'start': start, 'end': end }
                };
                return $http(req).then(function (response) {
                    return response.data;
                });

            }
        };
    })