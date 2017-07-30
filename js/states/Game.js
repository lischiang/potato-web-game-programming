(function (window) {

    window.game = window.game || {}

    function Game() {
        this.initialize();
    }

    var p = Game.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;
    p.counter = 0;
    p.msgTxt = null;
    p.linesContainer = null;
    //p.character = null;
    //p.character.nextX = 0;


    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addRoad();
        this.createLinesContainer();
        this.addLines();


    }
    p.addBG = function () {
        var bg = new createjs.Shape();
        bg.graphics.beginFill('#FFF').drawRect(0, 0, canvas.width, canvas.height);
        this.addChild(bg);
    }

    p.movePlayer = function(e){
        window.onkeydown = null;
        window.onkeyup = null;
        e = !e ? window.event : e;
        console.log(e);
        switch (e.keyCode) {
            case 37:
                leftKeyDown = true;
                //character.x = character.x -10;
                //createjs.Tween.get(this.character).to({ x: character.x -10, y: character.y }, 50, createjs.Ease.quadOut);
                break;
            case 39:
                rightKeyDown = true;
                break;
        }

    }

    p.stopPlayer = function(e) {
        e = !e ? window.event : e;
        console.log(e);
        switch (e.keyCode) {
            case 37:
                leftKeyDown = false;
                break;
            case 39:
                rightKeyDown = false;
                break;

        }
    }

    p.createLinesContainer = function () {

        this.linesContainer = new createjs.Container();
        this.addChild(this.linesContainer);

    }

    p.addRoad = function () {
        var road = new createjs.Shape();
        road.graphics.beginFill('#DDC').drawRect(0, 0, 400, 600);
        road.x = 200;
        road.y = 0;
        this.addChild(road);
    }

    p.addLines = function () {
        var line;
        var lines = this.linesContainer;
        line = new DivisionLine();
        line.x = 400;
        line.y = -100;
        line.speed = 25;
        lines.addChild(line);

    }
    p.addingNewLines = function (){
        var lineDiv = 20;
        var line;
        var lines = this.linesContainer;
        var len = this.linesContainer.getNumChildren();
        line = lines.getChildAt(len - 1);
        if (line.y >= 100 + lineDiv) {
            this.addLines();

        }



    }

    p.removeOldLines = function () {
        var line;
        var lines = this.linesContainer;
        var len = this.linesContainer.getNumChildren();
        for (var i = 0; i< len ; i++){
            line = lines.getChildAt(i);
            if (line != null){
                if(line.y >= 600) {
                    this.linesContainer.removeChildAt(i);
                }

            }



        }

    }


    p.update = function () {

        var line, nextY, len;
        len = this.linesContainer.getNumChildren();
        for(var i = 0; i< len ; i++){
            line = this.linesContainer.getChildAt(i);
            nextY = line.y + line.speed;
            line.nextY = nextY;

        }
        var nextX;

        if (this.leftKeyDown) {
            nextX = this.character.x - 10;
            this.character.nextX = nextX;


            if(nextX < 0){
                nextX = 0;
            }
        }else if (this.rightKeyDown) {
            nextX = this.character.x + 10;
            // if(nextX > stage.canvas.width - this.character.width){
            //     nextX = stage.canvas.width - this.character.width;
            // }
            this.character.nextX = nextX;
        }

    }
    p.render = function () {

        var line;
        var len = this.linesContainer.getNumChildren();
        for(var i = 0; i< len ; i++){
            line = this.linesContainer.getChildAt(i);
            line.y = line.nextY;

        }
        //this.character.x = this.character.nextX;


    }
    p.checkGame = function () {

    }
    p.run = function () {
        this.update();
        this.render();
        this.addingNewLines();
        this.removeOldLines();
        window.onkeydown = this.movePlayer;
        window.onkeyup = this.stopPlayer;

        var nextX;

        if (leftKeyDown) {
            nextX = character.x - 10;
            character.x = nextX;
            if(nextX < 0){
                nextX = 0;
            }
        }else if (rightKeyDown) {
            nextX = character.x + 10;
            // if(nextX > stage.canvas.width - this.character.width){
            //     nextX = stage.canvas.width - this.character.width;
            // }
            character.x = nextX;
        }

    }

    window.game.Game = Game;

}(window));