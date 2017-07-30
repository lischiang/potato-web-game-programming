/**
 * Created by lchiang on 2017-07-29.
 */

(function (window) {

    window.game = window.game || {}

    function GameMenu() {
        this.initialize();
    }

    var p = GameMenu.prototype = new createjs.Container();  // extends container

    p.Container_initialize = p.initialize;

    p.titleTxt = null;
    p.count = 0;

    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addTitle();
        //this.addOrbs();
        this.addButton();
    }
    p.addBG = function () {
        var bg = new createjs.Shape();
        bg.graphics.beginFill('0').drawRect(0, 0, canvas.width, canvas.height);
        this.addChild(bg);
    }
    p.addTitle = function () {
        this.titleTxt = new createjs.Text("Brake, Broke, Broken!", '40px Arial', '#FFF');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 200;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);
    }
    p.addOrbs = function () {
        var i, orb;
        var orbContainer = new createjs.Container();
        var numOrbs = 5;
        var orbSize = 20;
        var orbPadding = 10;
        var orbsPosition = 300;
        for (i = 0; i < numOrbs; i++) {
            orb = new PulsingOrb('#FFF', orbSize);
            orb.x = i * ((orbSize * 2) + orbPadding);
            orbContainer.addChild(orb);
        }
        orbContainer.x = orbContainer.y = orbsPosition;
        this.addChild(orbContainer);
    }
    p.addButton = function () {
        var btn, event;
        btn = new ui.SimpleButton('Play Game');
        btn.on('click',this.playGame,this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 400;
        btn.setButton({upColor:'FF0000', color:'#FFF', borderColor:'#FFF', overColor:'#900'});
        this.addChild(btn);
    }
    p.testing = function() {
        //this.playGame;
        alert("Hello");
    }
    p.playGame = function (e) {
        this.dispatchEvent(game.GameStateEvents.INSTRUCTIONS);  // here we force the event to happen in (*)
    }
    p.run = function () {
        this.titleTxt.alpha = Math.cos(this.count++ * 0.1) * 0.4 + 0.6;
    }
    window.game.GameMenu = GameMenu;

}(window));