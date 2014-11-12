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
    $scope.clock = {};
    $scope.clock.hour = Math.floor((Math.random() * 23) + 0);
    $scope.clock.minute = Math.floor((Math.random() * 59) + 0);

    while (($scope.clock.minute % 5) != 0) {
        $scope.clock.minute = Math.floor((Math.random() * 59) + 0);
    }
    if ($scope.clock.hour > 18) {
        $scope.clock.info = "soir";
    } else if ($scope.clock.hour > 12) {
        $scope.clock.info = "après-midi";
    } else {
        $scope.clock.info = "matin";
    }

    $scope.clock.hour = $scope.clock.hour > 12 ? $scope.clock.hour - 12 : $scope.clock.hour;

    $scope.clock.hour = $scope.clock.hour + $scope.clock.minute / 60;
    var degHour = $scope.clock.hour * 360 / 12;
    var degMinute = $scope.clock.minute * 360 / 60;

    var clock = new Clock('clock-canvas');
    clock.onRotateHour(degHour);
    clock.onRotateMinute(degMinute);

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

    $scope.onRotateHour = function() {
        clock.onRotateHour(90);
    };

    $scope.onRotateMinute = function() {
        clock.onRotateMinute(90);
    };

});