/**
 * Created by lfgcas on 2017-07-29.
 */
(function () {

    window.ui = window.ui || {};

    var RightButton = function () {
        this.initialize();
    }
    var p = RightButton.prototype = new createjs.Container();

    // RightButton properties

    p.imgPath = 'img/right.PNG';
    p.buttonRight;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.drawButton();
        this.setButtonListeners();
    }
    p.drawButton = function () {
        this.removeAllChildren();
        this.buttonRight = new createjs.Shape();
        this.buttonRight.graphics.beginStroke('black').beginFill('black').drawRect(0,0,57,56);
        this.addChild(this.buttonRight);
    }
    p.setButtonListeners = function () {
        this.cursor = 'pointer';
        this.drawButton();
    }
    p.setButton = function (obj) {
        this.set(obj);
        this.drawButton();

    }


    window.ui.RightButton = RightButton;
}());