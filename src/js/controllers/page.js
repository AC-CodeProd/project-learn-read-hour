"use strict";
var page = angular.module("LearnReadHour.Page");
page.controller('PageCtrl', function($rootScope, $scope) {
    if (!angular.isDefined($rootScope.colorClock))
        $rootScope.colorClock = 'clock1';
});