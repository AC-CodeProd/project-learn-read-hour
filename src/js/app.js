'use strict';
(function() {
    var LearnReadHour = angular.module('LearnReadHour', ['ngRoute', 'ngDialog']);

    /**
     * Configuring Routes
     **/
    LearnReadHour.config(function($routeProvider) {
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

    /**
     * Factory & Directive
     **/

    /**
     * Controller
     **/
    LearnReadHour.controller('PageCtrl', function($rootScope, $scope) {
        if (!angular.isDefined($rootScope.colorClock))
            $rootScope.colorClock = 'clock1';
    });
    LearnReadHour.controller('HomeCtrl', function($rootScope, $scope) {});

    LearnReadHour.controller('StartCtrl', function($rootScope, $scope, ngDialog, $location, $timeout) {
        $scope.location = $location;
        $scope.clock = {};
        $scope.onStartGame = function() {
            var clock = new Clock('clock-canvas');
            $scope.hour = 0;
            $scope.minute = 0;
            $scope.clock.hour = Math.floor((Math.random() * 23) + 0);
            $scope.clock.minute = Math.floor((Math.random() * 55) + 0);

            while (($scope.clock.minute % 5) != 0) {
                $scope.clock.minute = Math.floor((Math.random() * 55) + 0);
            }

            if ($scope.clock.hour > 18) {
                $scope.clock.info = "soir";
            } else if ($scope.clock.hour >= 12) {
                $scope.clock.info = "après-midi";
            } else {
                $scope.clock.info = "matin";
            }

            clock.setTime($scope.clock.hour, $scope.clock.minute);
            clock.onChangeClock($rootScope.colorClock);
        };

        $scope.onReloadGame = function() {
            $timeout(function() {
                $scope.onStartGame();
            }, 200);
        };

        $scope.onIncreaseHour = function() {
            if ($scope.hour == 24) {
                $scope.hour = 0;
            } else if ($scope.hour < 24) {
                $scope.hour++;
                if ($scope.hour == 24) {
                    $scope.hour = 0;
                }
            }
        };

        $scope.onIncreaseMinute = function() {
            if ($scope.minute == 60) {
                $scope.minute = 0;
                $scope.onIncreaseHour();
            } else if ($scope.minute < 60) {
                $scope.minute += 5;
                if ($scope.minute == 60) {
                    $scope.minute = 0;
                    $scope.onIncreaseHour();
                }
            }
        };

        $scope.onDecreasedHour = function() {
            if ($scope.hour == 0) {
                $scope.hour = 23;
            } else if ($scope.hour != 0) {
                $scope.hour--;
            }
        };

        $scope.onDecreasedMinute = function() {
            if ($scope.minute == 0) {
                $scope.minute = 55;
                $scope.onDecreasedHour();
            } else if ($scope.minute != 0) {
                $scope.minute -= 5;
            }
        };

        $scope.onMatchedTimeClock = function() {
            if ($scope.clock.hour == $scope.hour && $scope.clock.minute == $scope.minute) {
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

        $scope.onStartGame();

    });
    LearnReadHour.controller('OptionsCtrl', function($rootScope, $scope, $location) {
        $scope.onChangeClock = function(color) {
            $rootScope.colorClock = color;
            $location.path("/");
            toastr.clear();
            toastr.success('Sauvegarde réussie');
        };
    });
})();