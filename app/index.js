(function() {
	'use strict';
	angular.module('wave2us', ['ngRoute', 'ngMaterial', 'wave2us.home'])

	.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
		  $locationProvider.hashPrefix('!');
		  $routeProvider.otherwise({redirectTo: '/home'});
		}])

	.controller('IndexCtrl', IndexCtrl);

	function IndexCtrl($scope) {
		$scope.currentNavItem = 'home';
	}
})();