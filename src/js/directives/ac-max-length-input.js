"use strict";
var acMaxLengthInput = angular.module("LearnReadHour.acMaxLengthInput");
acMaxLengthInput.directive('acMaxLengthInput', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
                var maxlength = Number(attrs.acMaxLengthInput);

                function maxLengthInput(text) {
                    if (text.length > maxlength) {
                        var transformedInput = text.substring(0, maxlength);
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                        return transformedInput;
                    }
                    return text;
                }
                ngModelCtrl.$parsers.push(maxLengthInput);
            }
        };
    });