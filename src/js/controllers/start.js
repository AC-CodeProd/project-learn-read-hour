"use strict";
var start = angular.module("LearnReadHour.Start");
start.controller('StartCtrl', function($rootScope, $scope, ngDialog, $location, $timeout, ClockService) {
    $scope.location = $location;
    $scope.hour = 0;
    $scope.minute = 0;
    $scope.clock = {};
    ClockService.onInit($rootScope.colorClock);
    ClockService.onStartGame();
    $scope.clock.info = ClockService.getPartTime();
    $scope.onMatchedTimeClock = function() {
        if (ClockService.onMatchedTimeClock($scope.hour, $scope.minute)) {
            ngDialog.open({
                preCloseCallback: function(value) {
                    if (value == 0) {
                        $scope.location.path("/");
                    }
                    if (value == '$document' || value == '$closeButton' || value == 1) {
                        $scope.onReloadGame();
                    }
                },
                scope: $scope,
                template: '
                <div class="row">
                <div class="col-lg-10 col-lg-offset-1">
                <img class="img-responsive" src="assets/img/success.png" alt="Bravo !">
                </div>
                <div class="ngdialog-buttons">
                    <button type="button" class="button col-lg-6" ng-click="closeThisDialog(0)" ><img class="img-responsive" src="assets/img/button_menu.png" alt="Menu"></button>
                    <button type="button" class="button col-lg-6" ng-click="closeThisDialog(1)"><img class="img-responsive" src="assets/img/button_replay.png" alt="Rejouer"></button>
                </div>
                </div>',
                plain: true
            });
        } else {
            $scope.clock.hour = ClockService.getHour();
            $scope.clock.minute = ClockService.getMinute();
            ngDialog.open({
                preCloseCallback: function(value) {
                    if (value == 0) {
                        $scope.location.path("/");
                    }
                    if (value == '$document' || value == '$closeButton' || value == 1) {
                        $scope.onReloadGame();
                    }
                },
                scope: $scope,
                template: '
                <div class="row">
                <div class="col-lg-10 col-lg-offset-1">
                <img class="img-responsive" src="assets/img/fail.png" alt="Raté !">
                <p>L\'heure exacte était : {{clock.hour}} h {{clock.minute}}</p>
                </div>
                <div class="ngdialog-buttons">
                    <button type="button" class="button col-lg-6" ng-click="closeThisDialog(0)"><img class="img-responsive" src="assets/img/button_menu.png" alt="Menu"></button>
                    <button type="button" class="button col-lg-6" ng-click="closeThisDialog(1)"><img class="img-responsive" src="assets/img/button_replay.png" alt="Rejouer"></button>
                </div>
                </div>',
                plain: true
            });
        }
    };
    $scope.onReloadGame = function() {
        $timeout(function() {
            ClockService.onReloadGame();
            $scope.hour = 0;
            $scope.minute = 0;
            $scope.clock.info = ClockService.getPartTime();
        }, 200);
    };
});