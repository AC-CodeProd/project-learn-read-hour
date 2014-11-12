var Clock = function(id) {
    var _self = this;
    var stage;
    var layerClock;
    var layerHour;
    var layerMinute;
    var imageClock = new Image();
    var imageHour = new Image();
    var imageMinute = new Image();
    var deg = [-180, -150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180, -150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180];

    _self.construct = function() {
        _self.init();
    };

    _self.init = function() {
        stage = new Kinetic.Stage({
            container: id,
            width: 300,
            height: 300
        });

        layerClock = new Kinetic.Layer({
            x: 0,
            y: 0,
            width: 300,
            height: 300
        });
        layerHour = new Kinetic.Layer({
            x: 146.5,
            y: 145,
            width: 6,
            height: 75
        });
        layerMinute = new Kinetic.Layer({
            x: 151.5,
            y: 145,
            width: 5,
            height: 55
        });

        imageClock.onload = function() {
            var clock = new Kinetic.Image({
                image: imageClock,
                width: 300,
                height: 300
            });
            layerClock.add(clock);
            layerClock.draw();
        }

        imageHour.onload = function() {
            var hour = new Kinetic.Image({
                image: imageHour,
                x: 0,
                y: 0,
                width: 6,
                height: 75
            });
            layerHour.add(hour);
            layerHour.draw();
        }

        imageMinute.onload = function() {
            var minute = new Kinetic.Image({
                image: imageMinute,
                x: 0,
                y: 0,
                width: 5,
                height: 55
            });
            layerMinute.add(minute);
            layerMinute.draw();
        }

        imageClock.src = 'assets/img/clock1.png';
        imageHour.src = 'assets/img/firstHand.png';
        imageMinute.src = 'assets/img/secondHand.png';
        stage.add(layerClock, layerHour, layerMinute);
    };

    _self.onRotateHour = function(hour) {
        // layerHour.rotate(deg[hour]);
        layerHour.rotate(hour);
        layerHour.draw();
    };

    _self.onRotateMinute = function(minute) {
        layerMinute.rotate(minute);
        layerMinute.draw();
    };

    _self.construct();
};