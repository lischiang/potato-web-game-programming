(function (window) {

    window.game = window.game || {}

    function Game3() {
        this.initialize();
    }

    var p = Game3.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;
    p.lifeCounter = 8;  // number of lives
    p.distanceRun = 0;   // distance already run
    p.statusBoxContainer = null;
    p.environmentContainer = null;
    p.roadContainer = null;   
    p.statusBox = null;
    p.distanceStep = 0.001;
    p.xOfLeftEnvironments = -55;
    p.xOfRightEnvironments = 600;
    p.speedCounter = 300; 
    textGame1 = 0;
    textGame1.alpha = 0; 
    textGame2 = 0;
    textGame2.alpha = 0;  


    p.initialize = function () {
        this.Container_initialize();

        this.createRoadsContainer();
        this.addRoad();

        this.createEnvironmentContainer();
        this.addFirstTimeEnvironments();

        this.createStatusBoxContainer();
        this.addStatusBox();
        initialText = this.addMessage("Level 3", stage.canvas.height / 2);

        var len = holes.length;
        for (var i = 0; i < len; i++) {
            var myHole;
            if (holes[0] != null) {
                myHole = holes[0];
                holes.splice(0, 1);
                stage.removeChild(myHole);
            }
        }

        stage.removeChild(pedestrian);
        pedestrian = null;
    }

    p.addMessage = function (message,y) {
        var text = new createjs.Text(message, "40px Comic Sans MS", "black");
        text.textBaseline = "middle";
        text.textAlign = "center";
        text.x = stage.canvas.width / 2 - 100;
        text.y = y;
        text.alpha = 1;
        this.addChild(text);
        return text;
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

                    //cleaning from pedestrians

                    stage.removeChild(pedestrian);
                    pedestrian = null;

                    //generate a new hole in order to continue playing.

                    hole = new createjs.Bitmap('img/hole.png')
                    hole.speed = globalSpeed;    
                    hole.width = 35;
                    hole.height = 35;
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
        this.roadContainer = new createjs.Container();
        this.addChild(this.roadContainer);
    }

    p.createEnvironmentContainer = function () {
        this.environmentContainer = new createjs.Container();
        this.addChild(this.environmentContainer);
    }

    p.addRoad = function () {
        var road = new createjs.Bitmap('img/road_grey.png');
        road.x = 200;
        road.y = -250;
        road.scaleX = 3.738;
        road.scaleY = 3.738;
        road.speed = globalSpeed;

        this.roadContainer.addChild(road);
    }

    p.addingNewRoad = function () {
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
        env1 = new EnvironmentFlowers();
        env1.x = this.xOfLeftEnvironments;
        env1.y = 0;
        env1.speed = globalSpeed;

        // right side
        env4 = new EnvironmentFlowers();
        env4.x = this.xOfRightEnvironments;
        env4.y = 0;
        env4.speed = globalSpeed;

        // add environments of the initialization to the container
        envs.addChild(env1);
        envs.addChild(env4);
    }

    p.addEnvironments = function () {
        var envLeft, envRight;
        var envs = this.environmentContainer;
        var yOfNewEnvironments = -640 + globalSpeed;

        envLeft = new EnvironmentFlowers();
        envLeft.x = this.xOfLeftEnvironments;
        envLeft.y = yOfNewEnvironments;
        envLeft.speed = globalSpeed;

        envRight = new EnvironmentFlowers();
        envRight.x = this.xOfRightEnvironments;
        envRight.y = yOfNewEnvironments;
        envRight.speed = globalSpeed;

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
            var line, nextY, len, tree, bG, lenGum, lenOil;

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

            lenGum = gums.length;
            var myGum;
            for (var i = 0; i < lenGum; i++) {
                myGum = gums[i];
                nextY = myGum.y + myGum.speed;
                myGum.nextY = nextY;
            }

            lenOil = oils.length;
            var myOil;
            for (var i = 0; i < lenOil; i++) {
                myOil = oils[i];
                nextY = myOil.y + myOil.speed;
                myOil.nextY = nextY;
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
                character.nextX = nextX;
            }

            if (pedestrian != null) {

                pedestrian.nextY = pedestrian.speedY + pedestrian.y;

                pedestrian.nextX = pedestrian.speedX + pedestrian.x;
            }

            // update distance already run
            this.distanceRun += this.distanceStep;

            // update speed counter 
            this.speedCounter += 1;
        }

    }

    p.render = function () {

        if (!createjs.Ticker.getPaused()) {

            // update road
            var bG
            var len = this.roadContainer.getNumChildren();
            for (var i = 0; i < len; i++) {
                bG = this.roadContainer.getChildAt(i);
                bG.y = bG.nextY;
            }

            // update holes and check collision
            len = holes.length;
            var myHole;

            for (var i = 0; i < len; i++) {
                myHole = holes[i];
                myHole.y = myHole.nextY;

                // check collision
                if (myHole.x < character.x + character.width && 
                    myHole.x + myHole.width > character.x &&
                    myHole.y < character.y + character.height &&
                    myHole.height + myHole.y > character.y) {
                    // collision detected!
                    console.log("hit! PRESS SPACE BAR TO CONTINUE.");
                    createjs.Sound.play('splat');
                    this.removeChild(textGame1);
                    this.removeChild(textGame2);
                    textGame1 = this.addMessage('OUCH! ', 250);
                    textGame2 = this.addMessage('(Press space bar to continue)', 350);
                    // update life counter
                    this.lifeCounter -= 1;

                    this.updateAndCheckGameAfterHit();

                    togglePause = true;
                }
            }

            // update gums
            len = gums.length;
            //console.log("gums >>>>>>" + len);
            var myGum;

            for (var i = 0; i < len; i++) {
                myGum = gums[i];
                myGum.y = myGum.nextY;

                if (myGum.x < character.x + character.width && 
                    myGum.x + myGum.width > character.x &&
                    myGum.y < character.y + character.height &&
                    myGum.height + myGum.y > character.y) {

                    this.addMessage("A Chewing Gum!");

                    // collision with gum detected!                  
                    this.slowGame();

                    // remove gum
                    stage.removeChild(myGum);
                }
            }

            // update oils
            len = oils.length;
            //console.log("oils >>>>>>" + len);
            var myOil;

            for (var i = 0; i < len; i++) {
                myOil = oils[i];
                myOil.y = myOil.nextY;

                if (myOil.x < character.x + character.width && 
                    myOil.x + myOil.width > character.x &&
                    myOil.y < character.y + character.height &&
                    myOil.height + myOil.y > character.y) {

                    this.addMessage("It's slippery!");

                    // collision with oil detected!                  
                    this.fastGame();
                    
                    // remove oil spot
                    stage.removeChild(myOil);
                }
            }

            // update environment
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

            // update character
            character.x = character.nextX;

            if (pedestrian != null) {
                pedestrian.y = pedestrian.nextY;
                pedestrian.x = pedestrian.nextX;

                //hit test for the pedestrian

                if (pedestrian.x < character.x + character.width &&
                    pedestrian.x + pedestrian.width > character.x &&
                    pedestrian.y < character.y + character.height &&
                    pedestrian.height + pedestrian.y > character.y) {
                    createjs.Sound.play('splat');
                    // update life counter
                    this.lifeCounter -= 1;

                    togglePause = true;

                    this.updateAndCheckGameAfterHit();
                }

            }



            // update stage
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

    p.updateSpeed = function () {
        // update speed of the holes in the game
        var len = holes.length;
        for (var i = 0; i < len; i++) {
            
            if (holes[i] != null) {
                holes[i].speed = globalSpeed;    
            }
        }

        // update speed of the gums in the game
        len = gums.length;
        for (var i = 0; i < len; i++) {           
            if (gums[i] != null) {
                gums[i].speed = globalSpeed;    
            }
        }

        // update speed of the oil spots in the game
        len = oils.length;
        for (var i = 0; i < len; i++) {           
            if (oils[i] != null) {
                oils[i].speed = globalSpeed;    
            }
        }

        // update the speed of the environment in the game
        len = this.environmentContainer.getNumChildren();
        var env;
        for (var i = 0; i < len; i++) {
            env = this.environmentContainer.getChildAt(i);
            env.speed = globalSpeed;
        }

        // update the speed of the roads in the game
        len = this.roadContainer.getNumChildren();
        var road;
        for (var i = 0; i < len; i++) {
            road = this.roadContainer.getChildAt(i);
            road.speed = globalSpeed;
        }
    }

    p.slowGame = function () {
        globalSpeed = 7;                // set slower speed
        this.distanceStep = 0.0005;     // slow down the distance bar
        this.speedCounter = 0;          // reset timer for the change of speed 
        this.updateSpeed();             // update the speed of the objects in the scene
    }

    p.fastGame = function () {
        globalSpeed = 13;               // set faster speed
        this.distanceStep = 0.0015;     // speed up the distance bar
        this.speedCounter = 0;          // reset timer for the change of speed 
        this.updateSpeed();             // update the speed of the objects in the scene
    }

    p.normalizeSpeed = function () {
        globalSpeed = 10;            // restore normal speed of the level
        this.distanceStep = 0.001;  // restore distance bar speed
        this.updateSpeed();         // update the speed of the objects in the scene
    }

    p.checkGame = function () {
        if (this.distanceRun >= 1)
        {
            //this is to reset the characters and pedestrian value;
            character = null;
            pedestrian = null;
            this.dispatchEvent(game.GameStateEvents.GAME_WIN);
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

        if (this.speedCounter > 300) {  // when the timer has reached 300, restore the normal speed
            this.normalizeSpeed();
        }

        if (initialText.alpha > 0) {   // make inizial message to disappear
            initialText.alpha -= 0.02;
        }

        if (textGame1.alpha > 0) {   // make game message to disappear
            textGame1.alpha -= 0.03;
        }
        if (textGame2.alpha > 0) {   // make game message to disappear
            textGame2.alpha -= 0.03;
        }

        window.onkeydown = this.movePlayer;
        window.onkeyup = this.stopPlayer;
    }

    window.game.Game3 = Game3;

}(window));