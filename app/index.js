/*global firebase, window*/

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
	var db = firebase.database();
	var auth = firebase.auth();

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

	.config(['$locationProvider', '$routeProvider', '$mdThemingProvider', function ($locationProvider, $routeProvider, $mdThemingProvider) {
		$locationProvider.hashPrefix('!');
		$routeProvider.otherwise({
			redirectTo: '/home'
		});

		$mdThemingProvider.theme('default')
			.primaryPalette('green')
			.accentPalette('amber')
			.backgroundPalette('grey');
    }])

	.controller('IndexCtrl', ['$scope', '$rootScope', 'Auth', function ($scope, $rootScope, Auth) {
		$scope.currentNavItem = window.location.href.split('#!/')[1];

		$scope.auth = Auth;

		$scope.auth.$onAuthStateChanged(function (firebaseUser) {
			$rootScope.firebaseUser = firebaseUser;
		});

		$scope.logout = function () {
			firebase.auth().signOut();
		};

		var originatorEv;
		this.openMenu = function ($mdOpenMenu, ev) {
			originatorEv = ev;
			$mdOpenMenu(ev);
		};
    }]);
})();
