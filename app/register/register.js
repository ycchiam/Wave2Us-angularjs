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

    .controller('RegisterCtrl', ['$scope', function ($scope) {
        var db = firebase.database();

        $scope.user = {};
        $scope.Register = function () {
            console.log(db);
            var email = $scope.user.email;
            var password = $scope.user.password;
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function () {
                    var ref = db.ref("users");
                    ref.set({
                        alanisawesome: {
                            date_of_birth: "June 23, 1912",
                            full_name: "Alan Turing"
                        }
                    });
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
