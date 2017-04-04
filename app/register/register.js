/*global firebase, console*/

(function () {
    'use strict';
    angular.module('wave2us.register', ['ngRoute', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

        .config(['$routeProvider', '$mdThemingProvider', function ($routeProvider, $mdThemingProvider) {
            $routeProvider.when('/register', {
                templateUrl: 'register/register.html',
                controller: 'RegisterCtrl'
            });
            $mdThemingProvider.theme('docs-dark', 'default')
                .primaryPalette('yellow')
                .dark();
    }])

        .controller('RegisterCtrl', ['$scope', '$firebaseObject', function ($scope, $firebaseObject) {
            $scope.user = {};
            $scope.register = function () {
                var email = $scope.user.email;
                var password = $scope.user.password;

                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(function (user) {
                        user.updateProfile({
                            displayName: $scope.user.displayName
                        }).then(function () {
                            console.log('Display name set');
                        }, function (error) {
                            console.log(error);
                        });

                        var newUser = $firebaseObject(firebase.database().ref('/users/' + user.uid));
                        newUser.firstName = $scope.user.firstName;
                        newUser.lastName = $scope.user.lastName;
                        newUser.$save();
                    })
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode);
                    });
            };
    }]);
})();
