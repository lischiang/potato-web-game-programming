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
    p.environmentContainer = null;
    //p.character = null;
    //p.character.nextX = 0;


    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addRoad();
        this.createLinesContainer();
        this.addLines();
        this.createEnvironmentContainer();
        this.addTrees();

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
    p.createEnvironmentContainer = function () {
        this.environmentContainer = new createjs.Container();
        this.addChild(this.environmentContainer);
    }
    p.addRoad = function () {
        var road = new createjs.Shape();
        road.graphics.beginFill('#DDC').drawRect(0, 0, 400, 600);
        road.x = 200;
        road.y = 0;
        this.addChild(road);
    }
    p.addTrees = function () {
        var tree;
        var trees = this.environmentContainer;
        tree = new Cactus();
        tree.x = 100;
        tree.y = 0;
        tree.speed = 5;
        trees.addChild(tree);

        var tree;
        var trees = this.environmentContainer;
        tree = new Cactus();
        tree.x = 700;
        tree.y = 0;
        tree.speed = 5;
        trees.addChild(tree);
    }
    p.addingNewTrees = function () {
        var treeDiv = 100;
        var tree;
        var trees = this.environmentContainer;
        var len = this.environmentContainer.getNumChildren();
        tree = trees.getChildAt(len - 1);
        if (tree.y >= 500 + treeDiv) {
            this.addTrees();

        }
    }

    p.removeOldTrees = function () {
        var tree;
        var trees = this.environmentContainer;
        var len = this.environmentContainer.getNumChildren();
        for (var i = 0; i < len ; i++) {
            tree = trees.getChildAt(i);
            if (tree != null) {
                if (tree.y >= 1200) {
                    this.environmentContainer.removeChildAt(i);
                }
            }
        }
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

        var line, nextY, len, tree;
        len = this.linesContainer.getNumChildren();
        for(var i = 0; i< len ; i++){
            line = this.linesContainer.getChildAt(i);
            nextY = line.y + line.speed;
            line.nextY = nextY;

        }
        len = this.environmentContainer.getNumChildren();
        for (var i = 0; i < len ; i++) {
            tree = this.environmentContainer.getChildAt(i);
            nextY = tree.y + tree.speed;
            tree.nextY = nextY;
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

        var tree;
        len = this.environmentContainer.getNumChildren();
        for (var i = 0; i < len ; i++) {
            tree = this.environmentContainer.getChildAt(i);
            tree.y = tree.nextY;

        }
    }
    p.checkGame = function () {

    }
    p.run = function () {
        this.update();
        this.render();
        this.addingNewLines();
        this.removeOldLines();
        this.addingNewTrees();
        this.removeOldTrees();
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