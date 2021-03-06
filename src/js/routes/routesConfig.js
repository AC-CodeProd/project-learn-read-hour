"use strict";
var route = angular.module("LearnReadHour.Route");
route.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
    }).when('/start', {
        templateUrl: 'partials/start.html',
        controller: 'StartCtrl'
    }).when('/options', {
        templateUrl: 'partials/options.html',
        controller: 'OptionsCtrl'
    }).when('/credits', {
        templateUrl: 'partials/credits.html'
    });
    $routeProvider.otherwise({
        templateUrl: "partials/404.html"
    });
});