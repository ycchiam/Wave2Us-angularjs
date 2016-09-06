(function () {
    'use strict';
    angular.module('wave2us.register', ['ngRoute', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

    .config(function ($routeProvider, $mdThemingProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl'
        });
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    })

    .controller('RegisterCtrl', function ($scope) {
        $scope.user = {};
        $scope.SignIn = function () {
            var email = $scope.user.email;
            var password = $scope.user.password;
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
            });
        };
    });

})();
