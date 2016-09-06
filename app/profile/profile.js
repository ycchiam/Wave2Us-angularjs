(function () {
    'use strict';
    angular.module('wave2us.profile', ['ngRoute', 'ngMaterial', 'firebase', 'ngMessages', 'material.svgAssetsCache'])

    .config(function ($routeProvider, $mdThemingProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'profile/profile.html',
            controller: 'ProfileCtrl'
        });
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    })

    .controller('ProfileCtrl', function ($scope, $rootScope) {
    	$scope.user= {};
    	console.log($rootScope.firebaseUser);
//    	$scope.user.email = $rootScope.firebaseUser.email;
    });

})();
