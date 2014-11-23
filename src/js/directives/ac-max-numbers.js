"use strict";
var acMaxNumbers = angular.module("LearnReadHour.acMaxNumbers");
acMaxNumbers.directive('acMaxNumbers', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
                var max = Number(attrs.acMaxNumbers);

                function maxNumbers(value) {
                    if (isNaN(value)) {
                        ngModelCtrl.$setViewValue(0);
                        ngModelCtrl.$render();
                        return 0;
                    } else if (value > max) {
                        ngModelCtrl.$setViewValue(value.substring(0, 1));
                        ngModelCtrl.$render();
                        return value.substring(0, 1);
                    }
                    return value;
                }
                ngModelCtrl.$parsers.push(maxNumbers);
            }
        };
    });