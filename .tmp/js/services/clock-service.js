"use strict";var clockService=angular.module("LearnReadHour.ClockService");clockService.service("ClockService",function(){var _hour,_minute,_clock;return{onInit:function(colorClock){_hour=Math.floor(23*Math.random()),_minute=5*Math.floor(11*Math.random()),_clock=new Clock("clock-canvas"),_clock.onChangeClock(colorClock)},getHour:function(){return _hour},getMinute:function(){return _minute},getPartTime:function(){return _hour>18?"Soir":_hour>=12?"Après-midi":"Matin"},onStartGame:function(){_clock.setTime(_hour,_minute)},onReloadGame:function(){_hour=Math.floor(23*Math.random()),_minute=5*Math.floor(11*Math.random()),_clock.setTime(_hour,_minute)},onMatchedTimeClock:function(hour,minute){return _hour==hour&&_minute==minute?!0:!1}}});