angular.module('fetchEigenFace', [])
    .factory('fetchEigenFace', function ($http) {
        return {
            eigenFace: function (image) {
                var req = {
                    method: 'GET',
                    url: '/getEigenFace',
                    params: { 'image': image }
                };
                return $http(req).then(function (response) {
                    return response.data;
                });

            },
            updateEigenFace: function (data) {
                var req = {
                    method: 'GET',
                    url: '/updateEigenFace',
                    params: { 'img': data['img'], 'weights': JSON.stringify(data['weights']) }
                };
                return $http(req).then(function (response) {
                    return response.data;
                });
            }
        };
    })