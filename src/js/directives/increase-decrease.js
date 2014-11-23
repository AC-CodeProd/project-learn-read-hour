"use strict";
var acIncreaseDecrease = angular.module("LearnReadHour.acIncreaseDecrease");
acIncreaseDecrease.directive('acIncreaseDecrease', function($compile) {
    return {
        require: '?ngModel',
        restrict: 'EA',
        replace: true,
        scope: {
            acTitleIncrease: '@',
            acTitleDecreased: '@',
            acRate: '@',
            acLimite: '@'
        },
        template: '<div class="col-xs-2 col-lg-2">' +
            '<button class="button" ng-click="onIncrease()"  title={{acTitleIncrease}}><img class="img-responsive" src="assets/img/button_up.png" alt={{acTitleIncrease}}></button>' +
            '<button class="button" ng-click="onDecreased()" title={{acTitleDecreased}}><img class="img-responsive" src="assets/img/button_down.png" alt={{acTitleDecreased}}></button>' +
            '</div>',
        link: function(scope, element, attrs, ngModel) {
            scope.onIncrease = function() {
                if (ngModel.$viewValue == attrs.acLimite) {
                    ngModel.$setViewValue(0);
                } else if (ngModel.$viewValue < attrs.acLimite) {
                    var value = Number(ngModel.$viewValue) + Number(attrs.acRate);
                    ngModel.$setViewValue(value);
                    if (ngModel.$viewValue == attrs.acLimite) {
                        ngModel.$setViewValue(0);
                    }
                }
                ngModel.$render();
            };
            scope.onDecreased = function() {
                if (ngModel.$viewValue == 0) {
                    ngModel.$setViewValue(Number(attrs.acLimite) - Number(attrs.acRate));
                } else if (ngModel.$viewValue != 0) {
                    var value = Number(ngModel.$viewValue) - Number(attrs.acRate);
                    ngModel.$setViewValue(value);
                }
                ngModel.$render();
            };

        }
    };
});