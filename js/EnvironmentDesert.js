(function () {

    var EnvironmentDesert = function () {
        this.initialize();
    }
    var p = EnvironmentDesert.prototype = new createjs.Container();

    // EnvironmentDesert properties

    p.imgPath = 'img/desert.PNG';
    p.bg;
    p.speed = 0;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.drawEnvironmentDesert();
    }
    p.drawEnvironmentDesert = function () {
        this.removeAllChildren();
        this.bg = new createjs.Bitmap(this.imgPath);
        this.bg.x = 0;
        this.bg.y = 0;
        this.bg.scaleX = 1;
        this.bg.scaleY = 1;
        this.addChild(this.bg);
    }

    window.EnvironmentDesert = EnvironmentDesert;
}());