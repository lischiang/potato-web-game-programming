/**
 * Created by lfgcas on 2017-07-28.
 */

(function (window) {

    window.game = window.game || {}

    function SceneManager() {
        this.initialize();
    }

    var p = SceneManager.prototype;

    p.currentGameStateFunction;
    p.currentGameState;
    p.currentScene;
    p.count = 0;
    p.environmentSpeed;
    p.roadWidth = 400;
    p.roadLenght = 600;
    p.environmentWidth = 200;

    p.initialize = function () {
        canvas = document.getElementById('canvas');
        stage = new createjs.Stage(canvas);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on('tick', this.onTick, this);
        this.changeState(game.GameStates.MAIN_MENU);
    }
    p.changeState = function (state) {
        this.currentGameState = state;
        switch (this.currentGameState) {
            case game.GameStates.MAIN_MENU:
                this.currentGameStateFunction = this.gameStateGameMenu;
                break;
            case game.GameStates.INSTRUCTIONS:
                this.currentGameStateFunction = this.gameStateInstructions;
                break;
            case game.GameStates.GAME:
                this.currentGameStateFunction = this.gameStateGame;
                break;
            case game.GameStates.GAME2:
                this.currentGameStateFunction = this.gameStateGame2;
                break;
            case game.GameStates.GAME3:
                this.currentGameStateFunction = this.gameStateGame3;
                break;
            case game.GameStates.RUN_SCENE:
                this.currentGameStateFunction = this.gameStateRunScene;
                break;
            case game.GameStates.GAME_OVER:
                this.currentGameStateFunction = this.gameStateGameOver;
                break;
            case game.GameStates.GAME_WIN:
                this.currentGameStateFunction = this.gameStateGameWin;
                break;
        }
    }
    p.onStateEvent = function (e, data) {
        this.changeState(data.state);
    }
    p.gameStateGameMenu = function () {
        var scene = new game.GameMenu();
        scene.on(game.GameStateEvents.INSTRUCTIONS, this.onStateEvent, this, false, {state: game.GameStates.INSTRUCTIONS});
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }
    p.gameStateInstructions = function () {
        var scene = new game.GameInstructions();
        scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, false, {state: game.GameStates.GAME});
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, {state: game.GameStates.MAIN_MENU});
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }
    p.gameStateGame = function () {
        globalSpeed = 6;    // level 1 speed
        var scene = new game.Game();
        scene.on(game.GameStateEvents.GAME2, this.onStateEvent, this, false, {state: game.GameStates.GAME2});
        scene.on(game.GameStateEvents.GAME_OVER, this.onStateEvent, this, false, {state: game.GameStates.GAME_OVER});
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;

        this.changeState(game.GameStates.RUN_SCENE);

        this.cleaningBoard();

        createjs.Ticker.on('tick', this.addNewHoles, this);

        this.addNewCharacter();
    }

    p.gameStateGame2 = function () {
        this.cleaningBoard();
        stage.removeChild(character);

        globalSpeed = 8;   // level 2 speed
        var scene = new game.Game2();
        scene.on(game.GameStateEvents.GAME_OVER, this.onStateEvent, this, false, {state: game.GameStates.GAME_OVER});
        scene.on(game.GameStateEvents.GAME3, this.onStateEvent, this, false, {state: game.GameStates.GAME3});
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;

        this.changeState(game.GameStates.RUN_SCENE);

        this.addHoles((Math.random() * (1 - 0) + 0) + 200);
        createjs.Ticker.on('tick', this.addNewHoles, this);

        this.addNewCharacter();

        createjs.Ticker.on('tick', this.addNewPedestrians, this);
    }

    p.gameStateGame3 = function () {
        this.cleaningBoard();
        globalSpeed = 10;   // level 2 speed
        var scene = new game.Game3();
        scene.on(game.GameStateEvents.GAME_OVER, this.onStateEvent, this, false, {state: game.GameStates.GAME_OVER});
        scene.on(game.GameStateEvents.GAME_WIN, this.onStateEvent, this, false, {state: game.GameStates.GAME_WIN});
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;

        this.changeState(game.GameStates.RUN_SCENE);

        this.addHoles((Math.random() * (1 - 0) + 0) + 200);
        createjs.Ticker.on('tick', this.addNewHoles, this);

        this.addNewCharacter();
    }

    p.gameStateGameWin = function () {
        var scene = new game.GameWin();
        stage.addChild(scene);
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, {state:game.GameStates.MAIN_MENU});
        scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, false, {state:game.GameStates.GAME});
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateGameOver = function () {
        var scene = new game.GameOver();
        stage.addChild(scene);
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, {state: game.GameStates.MAIN_MENU});
        scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, false, {state: game.GameStates.GAME});
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.cleaningBoard = function () {

        //erasing all holes from previous stage

        var len = holes.length;
        for (var i = 0; i < len; i++) {
            var myHole;
            if (holes[0] != null) {
                myHole = holes[0];
                holes.splice(0, 1);
                stage.removeChild(myHole);
            }
        }

        //erasing all gums from previous stage

        var len = gums.length;
        for (var i = 0; i < len; i++) {
            var myGum;
            if (gums[0] != null) {
                myGum = gums[0];
                gums.splice(0, 1);
                stage.removeChild(myGum);
            }
        }

        //erasing all oils from previous stage

        var len = oils.length;
        for (var i = 0; i < len; i++) {
            var myOil;
            if (oils[0] != null) {
                myOil = oils[0];
                oils.splice(0, 1);
                stage.removeChild(myOil);
            }
        }
    }

    p.addPedestrians = function (mySpeedX) {
        pedestrian = new createjs.Bitmap('img/ped_brocoli.png');
        pedestrian.x = 170;
        pedestrian.y = 0;
        pedestrian.scaleX = .2;
        pedestrian.scaleY = .2;
        pedestrian.width = 35;
        pedestrian.height = 35;
        pedestrian.speedY = globalSpeed;
        pedestrian.speedX = mySpeedX;
        if(Math.random() * (1 - 0) + 0  <= 0.5){
            createjs.Sound.play('hillBilly');

        }else{
            createjs.Sound.play('hillBilly2');
        }

        stage.addChild(pedestrian);

    }

    p.addNewPedestrians = function () {
        var mySpeedX = Math.random() * (7 - 3) + 3;

        var recreationPoint = Math.random() * (50000 - 600) + 600;

        if (pedestrian == null) {
            this.addPedestrians(mySpeedX);
        }

        if (pedestrian.y >= recreationPoint) {
            stage.removeChild(pedestrian);

            this.addPedestrians(mySpeedX);

        }

    }


    p.addNewCharacter = function () {
        character = new createjs.Bitmap('img/potato_riding1.png')
        character.scaleX = 0.6;
        character.scaleY = 0.6;
        character.x = 400;
        character.y = 450;
        character.width = 30;
        character.height = 80;
        character.nextX = 400
        stage.addChild(character);
    }

    p.addHoles = function (myX) {
        hole = new createjs.Bitmap('img/hole.png')
        hole.x = myX;
        hole.scaleX = 0.15;
        hole.scaleY = 0.15;
        hole.y = -40;
        hole.speed = globalSpeed;
        hole.width = 35;
        hole.height = 35;
        holes.push(hole);
        stage.addChild(hole);
    }

    p.addGum = function (myX) {
        gum = new createjs.Bitmap('img/gum.png')
        gum.x = myX;
        gum.scaleX = 0.15;
        gum.scaleY = 0.15;
        gum.y = -35;
        gum.speed = globalSpeed;
        gum.width = 35;
        gum.height = 35;
        gums.push(gum);
        stage.addChild(gum);
    }

    p.addOil = function (myX) {
        oil = new createjs.Bitmap('img/oil.png')
        oil.x = myX;
        oil.scaleX = 0.2;
        oil.scaleY = 0.2;
        oil.y = -35;
        oil.speed = globalSpeed;
        oil.width = 35;
        oil.height = 35;
        oils.push(oil);
        stage.addChild(oil);
    }

    p.addNewHoles = function () {

        var len = holes.length;
        if (len > 0) {
            var myY = Math.random() * (1 - 0) + 0;
            myY = myY * 600;
            var numberOfSimultaneousHoles = 3;
            if (holes[0].y >= myY) {
                if (len <= numberOfSimultaneousHoles) {
                    var myX = Math.random() * (1 - 0) + 0;
                    myX = myX * 400 + 200;
                    //console.log(myX);

                    this.addHoles(myX);

                }
            }

            this.removeHoles();
        }

        // add new chewing gums

        len = gums.length;
        var random = Math.random() * 1000 // random num, >=0 and <=1000
        random = random.toFixed(0);     // round the number to have 0 decimal numbers
        var numberOfSimultaneousGums = 1;

        if (random % 100 == 0){
            if (len < numberOfSimultaneousGums) {
                var myXGum = Math.random();
                myXGum = myXGum * (this.roadWidth-40) + this.environmentWidth;
                this.addGum(myXGum);
            }
        }
        this.removeGums();

        // add new oil spots

        len = oils.length;
        random = Math.random() * 1000   // random num, >=0 and <=1000
        random = random.toFixed(0);     // round the number to have 0 decimal numbers
        var numberOfSimultaneousOils = 1;

        if (random % 100 == 0){
            if (len < numberOfSimultaneousOils) {
                var myXOil = Math.random();
                myXOil = myXOil * (this.roadWidth-40) + this.environmentWidth;
                this.addOil(myXOil);
            }
        }
        this.removeOils();

    }

    p.removeHoles = function () {
        var len = holes.length;

        for (var i = 0; i < len; i++) {
            var myHole;
            if (holes[i] != null) {
                myHole = holes[i];
                if (myHole.y >= 600) {
                    holes.splice(i, 1);
                    stage.removeChild(myHole);
                }

            }
        }


    }



    p.removeGums = function () {
        var len = gums.length;

        for (var i = 0; i < len; i++) {
            var myGum;
            if (gums[i] != null) {
                myGum = gums[i];
                if (myGum.y >= this.roadLenght) {
                    gums.splice(i, 1);
                    stage.removeChild(myGum);
                }
            }
        }
    }

    p.removeOils = function () {
        var len = oils.length;
        for (var i = 0; i < len; i++) {
            var myOil;
            if (oils[i] != null) {
                myOil = oils[i];
                if (myOil.y >= this.roadLenght) {
                    oils.splice(i, 1);
                    stage.removeChild(myOil);
                }
            }
        }
    }

    p.gameStateRunScene = function () {
        if (this.currentScene.run) {
            this.currentScene.run();
        }
    }
    p.run = function () {
        if (this.currentGameStateFunction != null) {
            this.currentGameStateFunction();
        }
    }
    p.onTick = function (e) {
        this.run();

        stage.update();
    }

    window.game.SceneManager = SceneManager;

}(window));
