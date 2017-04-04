(function () {
    'use strict';
    angular.module('wave2us.login', ['ngRoute', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

        .config(['$routeProvider', '$mdThemingProvider', function ($routeProvider, $mdThemingProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'login/login.html',
                controller: 'LoginCtrl'
            });
            $mdThemingProvider.theme('docs-dark', 'default')
                .primaryPalette('yellow')
                .dark();
    }])

        .controller('LoginCtrl', ['$scope', function ($scope) {
            $scope.user = {};
            $scope.signIn = function () {
                var email = $scope.user.email;
                var password = $scope.user.password;
                firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                });
            };
    }]);

})();
