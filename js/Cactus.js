(function () {

    // window.ui = window.ui || {};

    var Cactus = function () {
        this.initialize();
    }
    var p = Cactus.prototype = new createjs.Container();

    // Cactus properties

    p.imgPath = 'img/cactus.PNG';
    p.cactus;
    p.speed = 0;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.drawButton();
        //this.setButtonListeners();
    }
    p.drawButton = function () {
        this.removeAllChildren();
        this.cactus = new createjs.Bitmap(this.imgPath);
        this.cactus.x = 0;
        this.cactus.y = 0;
        this.cactus.scaleX = 0.1;
        this.cactus.scaleY = 0.1;
        this.addChild(this.cactus);
    }

    window.Cactus = Cactus;
}());