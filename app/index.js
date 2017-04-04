/*global firebase, window, console*/

(function () {
    'use strict';

    // Firebase Config
    var config = {
        apiKey: 'AIzaSyA7uEQKxfRbiwMuX7GkLWB01mwtP_IBiAw',
        authDomain: 'wave-2-us.firebaseapp.com',
        databaseURL: 'https://wave-2-us.firebaseio.com',
        storageBucket: 'wave-2-us.appspot.com'
    };

    // Initialize Firebase
    firebase.initializeApp(config);

    angular.module('wave2us', ['ngRoute', 'ngMaterial', 'firebase', 'wave2us.home', 'wave2us.login', 'wave2us.register', 'wave2us.profile'])

        .factory('Auth', ['$firebaseAuth',
        	  function ($firebaseAuth) {
                return $firebaseAuth();
        	  }
        	])

        .run(['$rootScope', '$location', function ($rootScope, $location) {
            $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
                // We can catch the error thrown when the $requireSignIn promise is rejected
                // and redirect the user back to the home page
                if (error === 'AUTH_REQUIRED') {
                    $location.path('/home');
                }
            });
    }])

        .config(['$locationProvider', '$routeProvider', '$mdThemingProvider', '$mdIconProvider', function ($locationProvider, $routeProvider, $mdThemingProvider, $mdIconProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider.otherwise({
                redirectTo: '/home'
            });

            $mdThemingProvider.theme('default')
                .primaryPalette('grey')
                .accentPalette('blue')
                .backgroundPalette('grey');
            //            .backgroundPalette('grey', {
            //                'default': '200'
            //            });
    }])

        .controller('IndexCtrl', ['$scope', '$rootScope', '$firebaseObject', 'Auth', function ($scope, $rootScope, $firebaseObject, Auth) {
            $scope.currentNavItem = window.location.href.split('#!/')[1];

            Auth.$onAuthStateChanged(function (user) {
                if (user) {
                    $scope.user = user;
                    //                    $scope.userData = $firebaseObject(firebase.database().ref('/users/' + user.uid));
                } else {
                    delete $scope.user;
                    //                    delete $scope.userData;
                    console.log("No user is signed in.");
                }
            });

            $scope.logout = function () {
                Auth.$signOut();
            };

            var originatorEv;
            this.openMenu = function ($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };
    }]);
})();
