
var Clock=function(id){var stage,layerClock,layerHour,layerMinute,_self=this,imageClock=new Image,imageHour=new Image,imageMinute=new Image;_self.construct=function(){_self.init()},_self.init=function(){stage=new Kinetic.Stage({container:id,width:300,height:300}),layerClock=new Kinetic.Layer({x:0,y:0,width:300,height:300}),layerHour=new Kinetic.Layer({x:149.5,y:145,width:6,height:55}),layerMinute=new Kinetic.Layer({x:149.5,y:145,width:6,height:75}),imageClock.onload=function(){var clock=new Kinetic.Image({image:imageClock,width:300,height:300});layerClock.add(clock),layerClock.draw()},imageHour.onload=function(){var hour=new Kinetic.Image({image:imageHour,x:-3,y:-55,width:6,height:55});layerHour.add(hour),layerHour.draw()},imageMinute.onload=function(){var minute=new Kinetic.Image({image:imageMinute,x:-3,y:-75,width:6,height:75});layerMinute.add(minute),layerMinute.draw()},imageClock.src="assets/img/clock1.png",imageHour.src="assets/img/secondHand.png",imageMinute.src="assets/img/firstHand.png",stage.add(layerClock,layerHour,layerMinute)},_self.onChangeClock=function(clock){imageClock.src="assets/img/"+clock+".png"},_self.onRotateHour=function(deg){layerHour.rotate(deg),layerHour.draw()},_self.onRotateMinute=function(deg){layerMinute.rotate(deg),layerMinute.draw()},_self.construct()};