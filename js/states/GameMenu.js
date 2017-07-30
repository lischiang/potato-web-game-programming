/**
 * Created by lchiang on 2017-07-29.
 */

(function (window) {

    window.game = window.game || {}

    function GameMenu() {
        this.initialize();
    }

    var p = GameMenu.prototype = new createjs.Container();

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
        var imgPath = 'img/potato_menu.PNG';
        bg = new createjs.Bitmap(imgPath);
        bg.scaleX = 0.95;
        bg.scaleY = 0.95;
        this.addChild(bg);
    }
    p.addTitle = function () {
        this.titleTxt = new createjs.Text("The Potato Game", '40px Comic Sans MS', '#000');
        this.titleTxt.lineWidth = 3;
        this.titleTxt.x = canvas.width / 4 * 3; 
        this.titleTxt.y = canvas.height / 3;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);
    }
    //p.addOrbs = function () {
    //    var i, orb;
    //    var orbContainer = new createjs.Container();
    //    var numOrbs = 5;
    //    var orbSize = 20;
    //    var orbPadding = 10;
    //    var orbsPosition = 300;
    //    for (i = 0; i < numOrbs; i++) {
    //        orb = new PulsingOrb('#FFF', orbSize);
    //        orb.x = i * ((orbSize * 2) + orbPadding);
    //        orbContainer.addChild(orb);
    //    }
    //    orbContainer.x = orbContainer.y = orbsPosition;
    //    this.addChild(orbContainer);
    //}
    p.addButton = function () {
        var btn, event;
        btn = new ui.SimpleButton('Start');
        btn.on('click', this.showInstructions, this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 4 * 3;
        btn.y = 380;
        btn.setButton({ upColor: 'FF0000', color: '#FFF', borderColor: '#FFF', overColor: '#900' });
        this.addChild(btn);
    }
    p.showInstructions = function (e) {
        this.dispatchEvent(game.GameStateEvents.INSTRUCTIONS);
    }
    p.run = function () {
        this.titleTxt.alpha = Math.cos(this.count++ * 0.1) * 0.4 + 0.6;
    }
    window.game.GameMenu = GameMenu;

}(window));