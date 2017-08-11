(function (window) {

    window.game = window.game || {}

    function GameInstructions() {
        this.initialize();
    }

    var p = GameInstructions.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.titleTxt = null;
    p.count = 0;

    p.initialize = function () {
        this.Container_initialize();
        this.addBG();

        this.addButtonNext();
        this.addButtonPrevious();
        this.addKeyboardInstructions();
        this.addLeftText();
        this.addRightText();
        this.addPotatoDrawing();
        this.addTitle();
    }
    p.addBG = function () {
        var bg = new createjs.Shape();
        bg.graphics.beginFill('0').drawRect(0, 0, canvas.width, canvas.height);
        this.addChild(bg);
    }
    p.addTitle = function () {
        var myText = 'Billy "The Tarte" is riding his bike down a hill, ' + 
            'running away from Jeff "The Fryer".' +
            ' Help him to reach the end ' +
            'of the slope in one piece by using the keys accordingly. ' +
            'Billy will appreciate it...'

        this.titleTxt = new createjs.Text(myText, '40px Comic Sans MS', '#FFF');
        this.titleTxt.lineWidth = 750;
        this.titleTxt.x = 20;

        this.titleTxt.y = 50;
        this.titleTxt.textAlign = 'left';
        this.addChild(this.titleTxt);
    }
    p.addButtonNext = function () {

        var btn, event;
        btn = new ui.RightButton;
        btn.on('click',this.playGame,this);
        //btn.regX = btn.width / 2;
        btn.x = 893;
        btn.y = 520;
        btn.setButton();
        this.addChild(btn);

        var imgPath = 'img/right.PNG';
        this.test = new createjs.Bitmap(imgPath);
        this.test.x = 893;
        this.test.y = 520;
        //this.buttonRight.on('click',this.playGame,this);
        // this.buttonRight.addEventListener('click', this.testing);
        //
        this.addChild(this.test);

    }

    p.addButtonPrevious = function () {
        var btn, event;
        btn = new ui.RightButton;
        btn.on('click',this.goToMenu,this);
        //btn.regX = btn.width / 2;
        btn.x = 50;
        btn.y = 520;
        btn.setButton();
        this.addChild(btn);

        var imgPath = 'img/left.PNG';
        this.buttonLeft = new createjs.Bitmap(imgPath);
        this.buttonLeft.x = 50;
        this.buttonLeft.y = 520;
        this.addChild(this.buttonLeft);
    }
    
    p.addKeyboardInstructions = function () {
        var imgPath = 'img/KeyboardArrows.png';
        this.keyboard = new createjs.Bitmap(imgPath);
        this.keyboard.x = 440;
        this.keyboard.y = 400;
        this.addChild(this.keyboard);
    }

    p.addLeftText = function () {
        this.leftTxt = new createjs.Text("Left", '40px Comic Sans MS', '#FFF');
        this.leftTxt.x = 400;
        this.leftTxt.y = 400;
        this.leftTxt.textAlign = 'center';
        this.leftTxt.rotation = 315;
        this.addChild(this.leftTxt);

    }
    p.addRightText = function () {
        this.rightTxt = new createjs.Text("Right", '40px Comic Sans MS', '#FFF');
        this.rightTxt.x = 625;
        this.rightTxt.y = 400;
        this.rightTxt.textAlign = 'center';
        this.rightTxt.rotation = 315;
        this.addChild(this.rightTxt);
    }

    p.addPotatoDrawing = function () {
        var imgPath = 'img/potato2.png';
        var potato = new createjs.Bitmap(imgPath);
        potato.scaleX = 0.7;
        potato.scaleY = 0.7;
        potato.x = 200;
        potato.y = 300;
        this.addChild(potato);
    }
    // p.addButton = function () {
    //     var btn, event;
    //     btn = new ui.SimpleButton('Play Game');
    //     btn.on('click',this.playGame,this);
    //     btn.regX = btn.width / 2;
    //     btn.x = canvas.width / 2;
    //     btn.y = 400;
    //     btn.setButton({upColor:'FF0000', color:'#FFF', borderColor:'#FFF', overColor:'#900'});
    //     this.addChild(btn);
    // }
    p.playGame = function (e) {
        this.dispatchEvent(game.GameStateEvents.GAME);
    }
    p.goToMenu = function (e) {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU)
    }
    p.run = function () {
        //this.titleTxt.alpha = Math.cos(this.count++ * .01) * .4 + 0.6;
        this.titleTxt.alpha = 1;
    }
    window.game.GameInstructions = GameInstructions;

}(window));