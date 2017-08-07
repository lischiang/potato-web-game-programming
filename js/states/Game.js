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
    p.roadContainer = null;
    //p.character = null;
    //p.character.nextX = 0;


    p.initialize = function () {
        this.Container_initialize();

        this.addBG();
        this.createLinesContainer();
        this.addRoad();

        //this.addLines();
        this.createEnvironmentContainer();
        this.addTrees();


    }


    p.addBG = function () {
        var bg = new createjs.Shape();
        bg.graphics.beginFill('#FFF').drawRect(0, 0, canvas.width, canvas.height);
        this.addChild(bg);
    }

    p.movePlayer = function (e) {
        window.onkeydown = null;
        window.onkeyup = null;
        e = !e ? window.event : e;
        console.log(e);
        switch (e.keyCode) {
            case 37:
                leftKeyDown = true;
                rightKeyDown = false


                //character.x = character.x -10;
                //createjs.Tween.get(this.character).to({ x: character.x -10, y: character.y }, 50, createjs.Ease.quadOut);
                break;
            case 39:
                rightKeyDown = true;
                leftKeyDown = false;

                break;

            case 32:
                togglePause = !togglePause;

                if (!togglePause) {

                    var len = holes.length;
                    for (var i = 0; i < len; i++) {
                        var myHole;
                        if (holes[0] != null) {
                            myHole = holes[0];
                            holes.splice(0, 1);
                            stage.removeChild(myHole);

                        }
                    }

                    //generating a new hole in order to continue playing.

                    hole = new createjs.Bitmap('img/hole.png')
                    var myX = Math.random() * (1 - 0) + 0;
                    myX = myX * 400 + 200;
                    hole.x = myX;
                    hole.scaleX = 0.2;
                    hole.scaleY = 0.2;
                    //hole.y = 10;
                    hole.speed = 10;
                    hole.width = 60;
                    hole.height = 55;
                    holes.push(hole);
                    stage.addChild(hole);

                }

                break;
        }

    }

    p.stopPlayer = function (e) {
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

        this.roadContainer = new createjs.Container();
        this.addChild(this.roadContainer);

    }
    p.createEnvironmentContainer = function () {
        this.environmentContainer = new createjs.Container();
        this.addChild(this.environmentContainer);
    }
    p.addRoad = function () {
        // var road = new createjs.Shape();
        // road.graphics.beginFill('#DDC').drawRect(0, 0, 400, 600);
        // road.x = 200;
        // road.y = 0;

        var road = new createjs.Bitmap('img/road_grey.png');
        road.x = 200;
        road.y = -250;
        road.scaleX = 3.738;
        road.scaleY = 3.738;
        road.speed = 10;

        this.roadContainer.addChild(road);
    }

    p.addingNewRoad = function () {
        //var lineDiv = 120;
        var road;
        var roads = this.roadContainer;
        var len = roads.getNumChildren();
        road = roads.getChildAt(len - 1);
        if (road.y >= 1) {
            this.addRoad();

        }
    }

    p.eraseOldRoad = function () {
        var road;
        var roads = this.roadContainer;
        var len = roads.getNumChildren();
        for (var i = 0; i < len; i++) {
            road = roads.getChildAt(i);
            if (road != null) {
                if (road.y >= 600) {
                    this.linesContainer.removeChildAt(i);
                }
            }
        }

    }
    p.addTrees = function () {
        var tree;
        var trees = this.environmentContainer;
        tree = new Cactus();
        tree.x = 100;
        tree.y = 0;
        tree.speed = 10;
        trees.addChild(tree);

        var tree;
        var trees = this.environmentContainer;
        tree = new Cactus();
        tree.x = 700;
        tree.y = 0;
        tree.speed = 15;
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
        for (var i = 0; i < len; i++) {
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
        line.speed = 10;
        lines.addChild(line);

    }
    p.addingNewLines = function () {
        var lineDiv = 120;
        var line;
        var lines = this.linesContainer;
        var len = this.linesContainer.getNumChildren();
        line = lines.getChildAt(len - 1);
        if (line.y >= lineDiv) {
            this.addLines();

        }
    }

    p.removeOldLines = function () {
        var line;
        var lines = this.linesContainer;
        var len = this.linesContainer.getNumChildren();
        for (var i = 0; i < len; i++) {
            line = lines.getChildAt(i);
            if (line != null) {
                if (line.y >= 600) {
                    this.linesContainer.removeChildAt(i);
                }
            }
        }
    }


    p.update = function () {

        var line, nextY, len, tree, bG;
        // len = this.linesContainer.getNumChildren();
        // for(var i = 0; i< len ; i++){
        //     line = this.linesContainer.getChildAt(i);
        //     nextY = line.y + line.speed;
        //     line.nextY = nextY;
        //
        // }

        len = this.roadContainer.getNumChildren();
        for (var i = 0; i < len; i++) {
            bG = this.roadContainer.getChildAt(i);
            nextY = bG.y + bG.speed;
            bG.nextY = nextY;
        }

        len = this.environmentContainer.getNumChildren();
        for (var i = 0; i < len; i++) {
            tree = this.environmentContainer.getChildAt(i);
            nextY = tree.y + tree.speed;
            tree.nextY = nextY;
        }

        // len = holes.getNumChildren();
        // for (var i = 0; i < len; i++) {
        //     hole = holes.getChildAt(i);
        //     nextY = hole.y + hole.speed;
        //     hole.nextY = nextY;
        // }

        len = holes.length;
        var myHole;
        for (var i = 0; i < len; i++) {
            myHole = holes[i];
            nextY = myHole.y + myHole.speed;
            myHole.nextY = nextY;
        }


        var nextX;

        if (leftKeyDown) {
            nextX = character.x - 10;
            character.nextX = nextX;


            if (nextX < 0) {
                nextX = 0;
            }
        } else if (rightKeyDown) {
            nextX = character.x + 10;
            // if(nextX > stage.canvas.width - this.character.width){
            //     nextX = stage.canvas.width - this.character.width;
            // }
            character.nextX = nextX;
        }

    }
    p.render = function () {

        // var line;
        // var len = this.linesContainer.getNumChildren();
        // for(var i = 0; i< len ; i++){
        //     line = this.linesContainer.getChildAt(i);
        //     line.y = line.nextY;
        //
        // }
        //this.character.x = this.character.nextX;


        if (!createjs.Ticker.getPaused()) {

            var bG
            var len = this.roadContainer.getNumChildren();
            for (var i = 0; i < len; i++) {
                bG = this.roadContainer.getChildAt(i);
                bG.y = bG.nextY;
            }


            len = holes.length;
            var myHole;

            for (var i = 0; i < len; i++) {
                myHole = holes[i];
                myHole.y = myHole.nextY;

                if (myHole.x < character.x + character.width &&
                    myHole.x + myHole.width > character.x &&
                    myHole.y < character.y + character.height &&
                    myHole.height + myHole.y > character.y) {
                    // collision detected!
                    console.log("hit");
                    togglePause = true;

                } else {
                    // no collision

                }

            }

            var tree;
            len = this.environmentContainer.getNumChildren();
            for (var i = 0; i < len; i++) {
                tree = this.environmentContainer.getChildAt(i);
                tree.y = tree.nextY;

            }

            character.x = character.nextX;
            stage.update();

        }


    }

    p.togglePause = function () {

        createjs.Ticker.setPaused(togglePause);


    }
    p.checkGame = function () {

    }
    p.run = function () {
        this.update();
        this.render();
        //this.addingNewLines();
        //this.removeOldLines();
        this.addingNewRoad();
        this.eraseOldRoad();
        this.addingNewTrees();
        this.removeOldTrees();
        this.togglePause();
        //window.game.middleGame.addNewHoles();
        window.onkeydown = this.movePlayer;
        window.onkeyup = this.stopPlayer;

    }

    window.game.Game = Game;

}(window));