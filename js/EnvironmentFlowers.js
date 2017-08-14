(function () {

    var EnvironmentFlowers = function () {
        this.initialize();
    }
    var p = EnvironmentFlowers.prototype = new createjs.Container();

    // EnvironmentFlowers properties

    p.imgPath = 'img/grass_flower.PNG';
    p.bg;
    p.speed = 0;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.drawEnvironmentFlowers();
    }
    p.drawEnvironmentFlowers = function () {
        this.removeAllChildren();
        this.bg = new createjs.Bitmap(this.imgPath);
        this.bg.x = 0;
        this.bg.y = 0;
        this.bg.scaleX = 1;
        this.bg.scaleY = 1;
        this.addChild(this.bg);
    }

    window.EnvironmentFlowers = EnvironmentFlowers;
}());