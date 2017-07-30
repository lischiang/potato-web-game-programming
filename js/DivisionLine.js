(function () {

    var DivisionLine = function () {
        this.initialize();
    }

    var p = DivisionLine.prototype = new createjs.Shape();

    p.count = 0;
    p.speed = 0;
    p.Shape_init= p.initialize;

    p.initialize = function () {

        this.Shape_init();
        this.graphics.beginFill('#FFF').drawRect(0, 0, 5, 100);
        this.on('tick', this.pulse);
    }
    p.pulse = function () {
        //this.alpha = Math.cos(this.count++ * 0.1) * 0.4 + 0.6;
    }
    window.DivisionLine = DivisionLine;
}());