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

    angular.module('wave2us', ['ngRoute', 'ngMaterial', 'firebase', 'wave2us.home', 'wave2us.login', 'wave2us.register', 'wave2us.profile'])
    
	.factory("Auth", ["$firebaseAuth",
	  function($firebaseAuth) {
	    return $firebaseAuth();
	  }
	])
    
    .config(function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    })

    .controller('IndexCtrl', function ($scope, $rootScope, Auth) {
        $scope.currentNavItem = window.location.href.split('#!/')[1];

        $scope.auth = Auth;

        $scope.auth.$onAuthStateChanged(function(firebaseUser) {
        	$rootScope.firebaseUser = firebaseUser;
        	console.log('Logged in user: ' + firebaseUser.email);
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
