var Clock = function(id) {
    var stage = new Kinetic.Stage({
        container: id,
        width: 300,
        height: 300
    });
    var layer = new Kinetic.Layer();
    var imageClock = new Image();
    var imageHour = new Image();
    var imageMinute = new Image();
    imageClock.onload = function() {
        var clock = new Kinetic.Image({
            x: 0,
            y: 0,
            image: imageClock,
            width: 300,
            height: 300
        });
        layer.add(clock);
        layer.draw();
    }
    imageHour.onload = function() {
        var hour = new Kinetic.Image({
            x: 148,
            y: 140,
            image: imageHour,
            width: 5,
            height: 135
        });
        hour.rotate(-90);
        layer.add(hour);
        layer.draw();
    }
    imageMinute.onload = function() {
        var minute = new Kinetic.Image({
            x: 148,
            y: 140,
            image: imageMinute,
            width: 5,
            height: 75
        });
        minute.rotate(360);
        layer.add(minute);
        layer.draw();
    }
    imageClock.src = 'assets/img/clock1.png';
    imageHour.src = 'assets/img/firstHand.png';
    imageMinute.src = 'assets/img/secondHand.png';

    stage.add(layer);
};