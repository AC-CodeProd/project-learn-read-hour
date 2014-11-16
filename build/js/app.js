
"use strict";var LearnReadHour=angular.module("LearnReadHour",["ngRoute","ngDialog"]);LearnReadHour.config(function($routeProvider){$routeProvider.when("/",{templateUrl:"partials/home.html",controller:"HomeCtrl"}).when("/start",{templateUrl:"partials/start.html",controller:"StartCtrl"}).when("/options",{templateUrl:"partials/options.html",controller:"OptionsCtrl"}).when("/credits",{templateUrl:"partials/credits.html"}),$routeProvider.otherwise({templateUrl:"partials/404.html"})}),LearnReadHour.controller("PageCtrl",function($rootScope){angular.isDefined($rootScope.colorClock)||($rootScope.colorClock="clock1")}),LearnReadHour.controller("HomeCtrl",function(){}),LearnReadHour.controller("StartCtrl",function($rootScope,$scope,ngDialog,$location){$scope.location=$location,$scope.clock={},$scope.onStartGame=function(){var clock=new Clock("clock-canvas");for($scope.hour=0,$scope.minute=0,$scope.clock.hour=Math.floor(23*Math.random()+0),$scope.clock.minute=Math.floor(55*Math.random()+0);$scope.clock.minute%5!=0;)$scope.clock.minute=Math.floor(55*Math.random()+0);$scope.clock.info=$scope.clock.hour>18?"soir":$scope.clock.hour>=12?"après-midi":"matin",clock.setTime($scope.clock.hour,$scope.clock.minute),clock.onChangeClock($rootScope.colorClock)},$scope.onReloadGame=function(){$scope.onStartGame(),$scope.$apply()},$scope.onIncreaseHour=function(){$scope.hour<24&&$scope.hour++,24==$scope.hour&&($scope.hour=0)},$scope.onIncreaseMinute=function(){$scope.minute<60&&($scope.minute+=5),60==$scope.minute&&($scope.minute=0,$scope.onIncreaseHour())},$scope.onDecreasedHour=function(){0!=$scope.hour&&$scope.hour--,0==$scope.hour&&($scope.hour=23)},$scope.onDecreasedMinute=function(){0!=$scope.minute&&($scope.minute-=5),0==$scope.minute&&($scope.minute=55,$scope.onDecreasedHour())},$scope.onMatchedTimeClock=function(){ngDialog.open($scope.clock.hour==$scope.hour&&$scope.clock.minute==$scope.minute?{preCloseCallback:function(value){0==value&&$scope.location.path("/"),("$document"==value||"$closeButton"==value||1==value)&&$scope.onReloadGame()},scope:$scope,template:'\n                <div class="row">\n                <div class="col-lg-10 col-lg-offset-1">\n                <img class="img-responsive" src="../build/assets/img/success.png" alt="Bravo !">\n                </div>\n                <div class="ngdialog-buttons">\n                    <button type="button" class="button col-lg-6" ng-click="closeThisDialog(0)" ><img class="img-responsive" src="../build/assets/img/button_menu.png" alt="Menu"></button>\n                    <button type="button" class="button col-lg-6" ng-click="closeThisDialog(1)"><img class="img-responsive" src="../build/assets/img/button_replay.png" alt="Rejouer"></button>\n                </div>\n                </div>',plain:!0}:{preCloseCallback:function(value){0==value&&$scope.location.path("/"),("$document"==value||"$closeButton"==value||1==value)&&$scope.onReloadGame()},scope:$scope,template:'\n                <div class="row">\n                <div class="col-lg-10 col-lg-offset-1">\n                <img class="img-responsive" src="../build/assets/img/fail.png" alt="Raté !">\n                <p>L\'heure exacte était : {{clock.hour}} h {{clock.minute}}</p>\n                </div>\n                <div class="ngdialog-buttons">\n                    <button type="button" class="button col-lg-6" ng-click="closeThisDialog(0)"><img class="img-responsive" src="../build/assets/img/button_menu.png" alt="Menu"></button>\n                    <button type="button" class="button col-lg-6" ng-click="closeThisDialog(1)"><img class="img-responsive" src="../build/assets/img/button_replay.png" alt="Rejouer"></button>\n                </div>\n                </div>',plain:!0})},$scope.onStartGame()}),LearnReadHour.controller("OptionsCtrl",function($rootScope,$scope,$location){$scope.onChangeClock=function(color){$rootScope.colorClock=color,$location.path("/"),toastr.clear(),toastr.success("Sauvegarde réussie")}});