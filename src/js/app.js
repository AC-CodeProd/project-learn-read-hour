'use strict';
var Learn_Read_Hour = angular.module('Learn_Read_Hour', ['ngRoute']);

/**
 * Configuring Routes
 **/
Learn_Read_Hour.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
    }).when('/start', {
        templateUrl: 'partials/start.html',
        controller: 'StartCtrl'
    }).when('/options', {
        templateUrl: 'partials/options.html'
    }).when('/credits', {
        templateUrl: 'partials/credits.html'
    });
    $routeProvider.otherwise({
        templateUrl: "partials/404.html"
    });
});

/**
 * Factory & Directive
 **/

/**
 * Controller
 **/
Learn_Read_Hour.controller('PageCtrl', function($rootScope, $scope, $route) {
    console.log('PageCtrl');

});
Learn_Read_Hour.controller('HomeCtrl', function($rootScope, $scope, $route) {
    console.log('HomeCtrl');

});
Learn_Read_Hour.controller('StartCtrl', function($rootScope, $scope, $route) {
    console.log('StartCtrl');
    $scope.hour = 0;
    $scope.minute = 0;
    $scope.onIncreaseHour = function() {
        if ($scope.hour < 23)
            $scope.hour++;
    };
    $scope.onIncreaseMinute = function() {
        if ($scope.minute < 59)
            $scope.minute++;
        if ($scope.minute == 59) {
            $scope.minute = 0;
            $scope.onIncreaseHour();
        }
    };
    $scope.onDecreaseHour = function() {
        if ($scope.hour != 0)
            $scope.hour--;
    };
    $scope.onDecreaseMinute = function() {
        if ($scope.minute != 0)
            $scope.minute--;
        if ($scope.minute == 0) {
            $scope.minute = 59;
            $scope.onDecreaseHour();
        }
    };
});