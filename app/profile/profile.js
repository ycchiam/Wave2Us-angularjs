/*global console*/

(function () {
    'use strict';
    angular.module('wave2us.profile', ['ngRoute', 'ngMaterial', 'firebase', 'ngMessages', 'material.svgAssetsCache'])

    .config(["$routeProvider", '$mdThemingProvider', function ($routeProvider, $mdThemingProvider) {
        $routeProvider.when('/profile', {
            controller: 'ProfileCtrl',
            templateUrl: 'profile/profile.html',
            resolve: {
                'currentAuth': ['Auth', function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        });

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    }])

    .controller('ProfileCtrl', ['$scope', 'currentAuth', function ($scope, currentAuth) {
        $scope.user = {};
        $scope.user.displayName = currentAuth.displayName;

        $scope.UpdateProfile = function () {
            currentAuth.updateProfile({
                displayName: $scope.user.displayName
            }).then(function () {
                console.log('Update Successful');
            }, function (error) {
                console.log('Update Failed');
            });
            console.log(currentAuth);
        };
    }]);
})();
