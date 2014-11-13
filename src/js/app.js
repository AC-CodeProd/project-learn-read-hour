'use strict';
var Learn_Read_Hour = angular.module('Learn_Read_Hour', ['ngRoute', 'ngDialog']);

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
Learn_Read_Hour.controller('StartCtrl', function($rootScope, $scope, $route, ngDialog) {
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

    var tmpHour = $scope.clock.hour > 12 ? $scope.clock.hour - 12 : $scope.clock.hour + $scope.clock.minute / 60;
    var degHour = tmpHour * 360 / 12;
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

    $scope.onMatchedTimeClock = function() {
        if ($scope.clock.hour == $scope.hour && $scope.clock.minute == $scope.minute) {
            console.log("Win");
        } else {
            console.log("Loser");
            console.log("Clock " + $scope.clock.hour + " : " + $scope.clock.minute);
            console.log("Input " + $scope.hour + " : " + $scope.minute);
            ngDialog.open({
                template: '\
                <p>Are you sure you want to close the parent dialog?</p>\
                <div class="ngdialog-buttons row">\
                    <button type="button" class="button col-lg-6" ><img class="img-responsive" src="../build/assets/img/button_menu.png" alt="Vérifier"></button>\
                    <button type="button" class="button col-lg-6" ><img class="img-responsive" src="../build/assets/img/button_replay.png" alt="Vérifier"></button>\
                </div>',
                plain: true
            });
        }
    };
});