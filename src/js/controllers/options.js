"use strict";
var options = angular.module("LearnReadHour.Options");
options.controller('OptionsCtrl', function($rootScope, $scope, $location) {
    $scope.onChangeClock = function(color) {
        $rootScope.colorClock = color;
        $location.path("/");
        toastr.clear();
        toastr.success('Sauvegarde réussie');
    };
});