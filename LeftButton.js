(function () {

    window.ui = window.ui || {};

    var LeftButton = function () {
        this.initialize();
    }
    var p = LeftButton.prototype = new createjs.Container();

    // RightButton properties

    p.imgPath = 'img/left.PNG';
    p.buttonLeft;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.drawButton();
        this.setButtonListeners();
    }
    p.drawButton = function () {
        this.removeAllChildren();
        this.buttonRight = new createjs.Shape();
        this.buttonRight.graphics.beginStroke('white').beginFill('black').drawRect(0,0,57,56);
        this.addChild(this.buttonLeft);
    }
    p.setButtonListeners = function () {
        this.cursor = 'pointer';
        this.drawButton();
    }
    p.setButton = function (obj) {
        this.set(obj);
        this.drawButton();

    }


    window.ui.LeftButton = LeftButton;
}());