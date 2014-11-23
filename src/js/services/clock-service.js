"use strict";
var clockService = angular.module("LearnReadHour.ClockService");
clockService.service('ClockService', function() {
    var _hour;
    var _minute;
    var _clock;
    return {
        onInit: function(colorClock) {
            _hour = Math.floor((Math.random() * 23));
            _minute = Math.floor((Math.random() * 11)) * 5;
            _clock = new Clock('clock-canvas');
            _clock.onChangeClock(colorClock);
        },
        getHour: function() {
            return _hour;
        },
        getMinute: function() {
            return _minute;
        },
        getPartTime: function() {
            if (_hour > 18) {
                return "Soir";
            } else if (_hour >= 12) {
                return "Après-midi";
            } else {
                return "Matin";
            }
        },
        onStartGame: function() {
            _clock.setTime(_hour, _minute);
        },
        onReloadGame: function() {
            _hour = Math.floor((Math.random() * 23));
            _minute = Math.floor((Math.random() * 11)) * 5;
            _clock.setTime(_hour, _minute);
        },
        onMatchedTimeClock: function(hour, minute) {
            if (_hour == hour && _minute == minute) {
                return true;
            }
            return false;
        }
    }
});