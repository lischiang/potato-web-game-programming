/* inspired by chapter 10 "GameWin.js" */ 

(function (window) {

    window.game = window.game || {}

    function GameWin() {
        this.initialize();
    }

    var p = GameWin.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addFries();
        this.addMessage();
        this.addButton();
    }
    p.addBG = function () {
        var bg = new createjs.Shape();
        bg.graphics.beginFill('#fcf8ab').drawRect(0, 0, canvas.width, canvas.height);
        this.addChild(bg);
    }
    p.addMessage = function () {
        this.titleTxt = new createjs.Text("YOU WON! =D", '40px Arial', '#000');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 200;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);
    }

    p.addFries = function () {
        var fries = new createjs.Bitmap('img/billy_happy.png');
        fries.regX = fries.width / 2;  
        fries.x = 0; // canvas.width / 2;;
        fries.regY = fries.height / 2;
        fries.y = 0; // canvas.height / 2;
        
        fries.scaleX = 0.7;
        fries.scaleY = 0.7;
        this.addChild(fries);
    }

    p.addButton = function () {
        var btn;

        // add button to go to main menu
        btn = new ui.SimpleButton('Main Menu');
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 280;
        btn.on('click', this.mainMenu, this);
        this.addChild(btn);

        // add button to play again from level 1
        btn = new ui.SimpleButton('Play Again');
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 350;
        btn.on('click', this.playGame, this);
        this.addChild(btn);
    }
    p.mainMenu = function (e) {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
    }
    p.playGame = function (e) {
        this.dispatchEvent(game.GameStateEvents.GAME);
    }

    window.game.GameWin = GameWin;

}(window));