(function (window) {

    window.game = window.game || {}

    function Game() {
        this.initialize();
    }

    var p = Game.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;
    p.lifeCounter = 3;  // number of lives
    p.distanceRun = 0;  // distance already run
    p.statusBoxContainer = null;
    p.environmentContainer = null;
    p.roadContainer = null;   
    p.statusBox = null;
    p.distanceStep = 0.005;
    environmentSpeed1 = 20; // defining this variable globally (can be read in SceneManager)
    p.xOfLeftEnvironments = -55;
    p.xOfRightEnvironments = 600;


    p.initialize = function () {
        this.Container_initialize();

        this.createRoadsContainer();
        this.addRoad();

        //this.addLines();
        this.createEnvironmentContainer();
        this.addFirstTimeEnvironments();

        this.createStatusBoxContainer();
        this.addStatusBox();
    }

    p.createStatusBoxContainer = function () {
        this.statusBoxContainer = new createjs.Container();
        this.addChild(this.statusBoxContainer);
    }
    p.addStatusBox = function () {

        var statusBoxes = this.statusBoxContainer;

        var statusBox = new StatusBox('#77c655', '#000', this.lifeCounter);
        statusBox.x = 880;
        statusBox.y = 30;

        this.statusBoxContainer.addChild(statusBox);
    }

    p.movePlayer = function (e) {
        window.onkeydown = null;
        window.onkeyup = null;
        e = !e ? window.event : e;
        //console.log(e);
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

                    // remove all the current holes
                    var len = holes.length;
                    for (var i = 0; i < len; i++) {
                        var myHole;
                        if (holes[0] != null) {
                            myHole = holes[0];
                            holes.splice(0, 1); // remove first element from holes
                            stage.removeChild(myHole);
                        }
                    }

                    //generate a new hole in order to continue playing.

                    hole = new createjs.Bitmap('img/hole.png')
                    hole.speed = environmentSpeed1;    // >>>>>>>>>  this should be environmentSpeed1, but gives bug if changed
                    hole.width = 60;
                    hole.height = 55;
                    var myX = Math.random() * (1 - 0) + 0;
                    myX = myX * (400 - hole.width) + 200;
                    hole.x = myX;
                    hole.scaleX = 0.15;
                    hole.scaleY = 0.15;
                    //hole.y = 10;  
                    holes.push(hole);
                    stage.addChild(hole);
                }

                break;
        }

    }

    p.stopPlayer = function (e) {
        e = !e ? window.event : e;
        //console.log(e);
        switch (e.keyCode) {
            case 37:
                leftKeyDown = false;

                break;
            case 39:
                rightKeyDown = false;
                break;

        }
    }

    p.createRoadsContainer = function () {

        // this.linesContainer = new createjs.Container();
        // this.addChild(this.linesContainer);

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
        road.speed = environmentSpeed1;

        this.roadContainer.addChild(road);
    }

    p.addingNewRoad = function () {
        //var lineDiv = 120;
        var road;
        var roads = this.roadContainer;
        var len = roads.getNumChildren();
        road = roads.getChildAt(len - 1);
        if (road.y >= 1) {  // whenever the last added road has y=1, add a new road
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
                if (road.y >= 600) {    // check when the road "is leaving the screen", and remove it
                    this.roadContainer.removeChildAt(i);
                }
            }
        }

    }

    p.addFirstTimeEnvironments = function () {
        var env1, env2, env3, env4, env5, env6;
        var envs = this.environmentContainer;

        // left side
        env1 = new EnvironmentDesert();
        env1.x = this.xOfLeftEnvironments;
        env1.y = 0;
        env1.speed = environmentSpeed1;


        env2 = new EnvironmentDesert();
        env2.x = this.xOfLeftEnvironments;
        env2.y = 256;
        env2.speed = environmentSpeed1;

        env3 = new EnvironmentDesert();
        env3.x = this.xOfLeftEnvironments;
        env3.y = 512;
        env3.speed = environmentSpeed1;

        // right side
        env4 = new EnvironmentDesert();
        env4.x = this.xOfRightEnvironments;
        env4.y = 0;
        env4.speed = environmentSpeed1;


        env5 = new EnvironmentDesert();
        env5.x = this.xOfRightEnvironments;
        env5.y = 256;
        env5.speed = environmentSpeed1;

        env6 = new EnvironmentDesert();
        env6.x = this.xOfRightEnvironments;
        env6.y = 512;
        env6.speed = environmentSpeed1;

        // add environments of the initialization to the container
        envs.addChild(env1);
        envs.addChild(env2);
        envs.addChild(env3);
        envs.addChild(env4);
        envs.addChild(env5);
        envs.addChild(env6);
    }

    p.addEnvironments = function () {
        var envLeft, envRight;
        var envs = this.environmentContainer;
        var yOfNewEnvironments = -256 + environmentSpeed1;

        envLeft = new EnvironmentDesert();
        envLeft.x = this.xOfLeftEnvironments;
        envLeft.y = yOfNewEnvironments;
        envLeft.speed = environmentSpeed1;

        envRight = new EnvironmentDesert();
        envRight.x = this.xOfRightEnvironments;
        envRight.y = yOfNewEnvironments;
        envRight.speed = environmentSpeed1;

        // add new environments to the container
        envs.addChild(envLeft);
        envs.addChild(envRight);
    }

    p.addingNewEnvironments = function () {
        var env;
        var envs = this.environmentContainer;
        var len = envs.getNumChildren();
        env = envs.getChildAt(len - 1);
        // whenever the last added environment has y=1, add a new road
        if (env != null) {
            if (env.y >= 1) {
                this.addEnvironments();
            }
        }
    }

    p.eraseOldEnvironments = function () {
        var env;
        var envs = this.environmentContainer;
        var len = envs.getNumChildren();
        for (var i = 0; i < len; i++) {
            env = envs.getChildAt(i);
            if (env != null) {
                // check when the environment "is leaving the screen", and remove it
                if (env.y >= 600) {
                    this.environmentContainer.removeChildAt(i);
                }
            }
        }

    }

    p.update = function () {

        if (!createjs.Ticker.getPaused()) {
            var line, nextY, len, tree, bG;

            len = this.roadContainer.getNumChildren();
            for (var i = 0; i < len; i++) {
                bG = this.roadContainer.getChildAt(i);
                nextY = bG.y + bG.speed;
                bG.nextY = nextY;
            }

            len = this.environmentContainer.getNumChildren();
            for (var i = 0; i < len; i++) {
                env = this.environmentContainer.getChildAt(i);
                nextY = env.y + env.speed;
                env.nextY = nextY;
            }

            len = holes.length;
            var myHole;
            for (var i = 0; i < len; i++) {
                myHole = holes[i];
                nextY = myHole.y + myHole.speed;
                myHole.nextY = nextY;
            }


            var nextX;

            if (leftKeyDown && character.x > 200) {
                nextX = character.x - 10;
                character.nextX = nextX;


                if (nextX < 0) {
                    nextX = 0;
                }
            } else if (rightKeyDown && character.x < 600 - character.width) {
                nextX = character.x + 10;
                // if(nextX > stage.canvas.width - this.character.width){
                //     nextX = stage.canvas.width - this.character.width;
                // }
                character.nextX = nextX;
            }

            // update distance already run
            this.distanceRun += this.distanceStep;
        }

    }

    p.render = function () {

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

                if (myHole.x < character.x + character.width && // >>>>>>>>>>> maybe better give some tollerance
                    myHole.x + myHole.width > character.x &&
                    myHole.y < character.y + character.height &&
                    myHole.height + myHole.y > character.y) {
                    // collision detected!
                    console.log("hit! PRESS SPACE BAR TO CONTINUE.");
                    // update life counter
                    this.lifeCounter -= 1;

                    this.updateAndCheckGameAfterHit();

                    togglePause = true;

                } else {
                    // no collision

                }

            }

            var env;
            len = this.environmentContainer.getNumChildren();
            for (var i = 0; i < len; i++) {
                env = this.environmentContainer.getChildAt(i);
                env.y = env.nextY;

            }

            // update distance bar
            if (this.statusBoxContainer.getNumChildren()>0)
            {
                statusBox = this.statusBoxContainer.getChildAt(0);
                statusBox.updateBar(this.distanceRun);
            }

            character.x = character.nextX;
            stage.update();

        }
    }

    p.togglePause = function () {

        createjs.Ticker.setPaused(togglePause);
    }
    p.updateAndCheckGameAfterHit = function () {
        // update number of lives on the ui
        if (this.statusBoxContainer.getNumChildren()>0)
        {
            statusBox = this.statusBoxContainer.getChildAt(0);
            statusBox.updateLives(this.lifeCounter);
        }
        // check if the player has lost the game
        if (this.lifeCounter == 0)
        {
            this.dispatchEvent(game.GameStateEvents.GAME_OVER);
        }
    }

    p.checkGame = function () {
        if (this.distanceRun >= 1)
        {
            this.dispatchEvent(game.GameStateEvents.GAME2);
        }
    }

    p.run = function () {
        
        this.update();
        this.render();
        this.checkGame();
        this.addingNewRoad();
        this.eraseOldRoad();
        this.addingNewEnvironments();
        this.eraseOldEnvironments();
        this.togglePause();
        window.onkeydown = this.movePlayer;
        window.onkeyup = this.stopPlayer;

    }

    window.game.Game = Game;

}(window));