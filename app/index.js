(function () {
    'use strict';

    // Firebase Config
    var config = {
        apiKey: "AIzaSyA7uEQKxfRbiwMuX7GkLWB01mwtP_IBiAw",
        authDomain: "wave-2-us.firebaseapp.com",
        databaseURL: "https://wave-2-us.firebaseio.com",
        storageBucket: "wave-2-us.appspot.com"
    };

    // Initialize Firebase
    firebase.initializeApp(config);
    var db = firebase.database();
    var auth = firebase.auth();

    // Shared
    var activeUser = {
        email: null,
        displayName: null,
        show: false
    };

    angular.module('wave2us', ['ngRoute', 'ngMaterial', 'wave2us.home', 'wave2us.login', 'wave2us.register'])

    .config(function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    })

    .controller('IndexCtrl', function ($scope) {
        $scope.currentNavItem = window.location.href.split('#!/')[1];

        $scope.activeUser = activeUser;
        auth.onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                $scope.activeUser.show = true;
            } else {
                // No user is signed in.
                $scope.activeUser.show = false;
            }
            $scope.$apply();
            console.log("User logged in: " + $scope.activeUser.show);
        });

        $scope.logout = function () {
            firebase.auth().signOut();
        }

        var originatorEv;
        this.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
    })


})();
