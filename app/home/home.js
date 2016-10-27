'use strict';

angular.module('wave2us.home', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', ['$scope', function ($scope) {
    $scope.infos = [{
        img: 'home/portfolio/hongkong.jpg',
        title: 'Hong Kong',
        ace: 'with Beanca Yu',
    }, {
        img: 'home/portfolio/singapore.jpg',
        title: 'Singapore',
        ace: 'with Shian Lee',
    }, {
        img: 'home/portfolio/KualaLumpur.jpg',
        title: 'Kuala Lumpur',
        ace: 'with Eric Tan',
    }, {
        img: 'home/portfolio/srilanka.jpg',
        title: 'Sri Lanka',
        ace: 'with Ravee',
    }, {
        img: 'home/portfolio/tokyo.jpg',
        title: 'Tokyo',
        ace: 'with Pong',
    }, {
        img: 'home/portfolio/newzealand.jpg',
        title: 'New Zealand',
        ace: 'with Shuyen',
    }];
}]);
