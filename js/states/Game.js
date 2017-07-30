(function (window) {

    window.game = window.game || {}

    function Game() {
        this.initialize();
    }

    var p = Game.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.msgTxt = null;
    p.orbContainer = null;

    p.initialize = function () {
        this.Container_initialize();
        this.addBG();

    }
    p.addBG = function () {
        var bg = new createjs.Shape();
        bg.graphics.beginFill('#92CBD6').drawRect(0, 0, canvas.width, canvas.height);
        this.addChild(bg);
    }

    p.update = function () {

    }
    p.render = function () {

    }
    p.checkGame = function () {

    }
    p.run = function () {

    }

    window.game.Game = Game;

}(window));