/*global firebase, console, document*/

(function () {
    'use strict';
    angular.module('wave2us.profile', ['ngRoute', 'ngMaterial', 'firebase', 'ngMessages', 'material.svgAssetsCache'])

        .config(["$routeProvider", '$mdThemingProvider', function ($routeProvider, $mdThemingProvider) {
            $routeProvider.when('/profile', {
                controller: 'ProfileCtrl',
                templateUrl: 'profile/profile.html',
                resolve: {
                    'currentUser': ['Auth', function (Auth) {
                        return Auth.$requireSignIn();
                    }]
                }
            });

            $mdThemingProvider.theme('docs-dark', 'default')
                .primaryPalette('yellow')
                .dark();
    }])

        .controller('ProfileCtrl', ['$scope', '$mdDialog', '$firebaseObject', 'currentUser', function ($scope, $mdDialog, $firebaseObject, currentUser) {
            $scope.userData = $firebaseObject(firebase.database().ref('/users/' + currentUser.uid));
            $scope.showProfileEdit = function (ev) {
                $mdDialog.show({
                    controller: editController,
                    templateUrl: 'profile/edit.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            };

            function editController($scope, $mdDialog) {
                $scope.user = {};
                $scope.user.displayName = currentUser.displayName;
                $scope.updateProfile = function () {
                    currentUser.updateProfile({
                        displayName: $scope.user.displayName
                    }).then(function () {
                        console.log('Update Successful');
                    }, function (error) {
                        console.log('Update Failed');
                    });
                    $mdDialog.hide();
                };
            }
    }]);
})();
