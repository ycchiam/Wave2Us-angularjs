'use strict';

angular.module('wave2us.login', ['ngRoute', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

.config(['$routeProvider', function($routeProvider, $mdThemingProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
  
}])

.controller('LoginCtrl', [function() {

}]);

