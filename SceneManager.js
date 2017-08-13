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
            case game.GameStates.RUN_SCENE:
                this.currentGameStateFunction = this.gameStateRunScene;
                break;
            case game.GameStates.GAME_OVER:
                this.currentGameStateFunction = this.gameStateGameOver;
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
        globalSpeed = 8;    // level 1 speed
        var scene = new game.Game();
        scene.on(game.GameStateEvents.GAME2, this.onStateEvent, this, false, {state: game.GameStates.GAME2});
        scene.on(game.GameStateEvents.GAME_OVER, this.onStateEvent, this, false, {state: game.GameStates.GAME_OVER});
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;

        this.changeState(game.GameStates.RUN_SCENE);

        //this.environmentSpeed = environmentSpeed1;  // environmentSpeed1 is a global variable defined in Game

        // remove previous holes
        //this.removeAllHoles();
        //stage.removeChild(character);
       
        this.addHoles((Math.random() * (1 - 0) + 0) + 200);
        createjs.Ticker.on('tick', this.addNewHoles, this);

        this.addNewCharacter();   
    }

    p.gameStateGame2 = function () {
        globalSpeed = 12;   // level 2 speed
        var scene = new game.Game2();
        scene.on(game.GameStateEvents.GAME_OVER, this.onStateEvent, this, false, {state: game.GameStates.GAME_OVER});
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, {state: game.GameStates.MAIN_MENU});
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;

        this.changeState(game.GameStates.RUN_SCENE);

        //this.environmentSpeed = environmentSpeed2;   // environmentSpeed2 is a global variable defined in Game2

        // remove previous holes
        //this.removeAllHoles();
        //stage.removeChild(character);

        this.addHoles((Math.random() * (1 - 0) + 0) + 200);
        createjs.Ticker.on('tick', this.addNewHoles, this);

        this.addNewCharacter();      
    }

    p.gameStateGameOver = function () {
        var scene = new game.GameOver();
        stage.addChild(scene);
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, {state:game.GameStates.MAIN_MENU});
        scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, false, {state:game.GameStates.GAME});
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.addNewCharacter = function () {
        character = new createjs.Bitmap('img/potato_riding1.png')
        // character = new createjs.Shape();
        // character.graphics.beginFill('#A00').drawRect(0, 0, 30, 100);
        //character.name = 'myCharacter';
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
        hole.y = -30;
        hole.speed = globalSpeed;
        hole.width = 60;
        hole.height = 55;
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

    p.addNewHoles = function () {
        var len = holes.length;
        var myY = Math.random() * (1 - 0) + 0;
        myY = myY*600;
        var numberOfSimultaneousHoles = 3;
        if (holes[0].y >= myY ) {
            if (len <= numberOfSimultaneousHoles) {
                var myX = Math.random() * (1 - 0) + 0;
                myX = myX * 400 + 200;
                //console.log(myX);

                this.addHoles(myX);
            }
        }

        this.removeHoles();

        // add new chewing gums

        len = gums.length;
        var random = Math.random() * 1000 // random num, >=0 and <=1000
        random = random.toFixed(0);     // round the number to have 0 decimal numbers
        var numberOfSimultaneousGums = 1;

        //console.log("random:" + random );
        if (random % 100 == 0){
            if (len < numberOfSimultaneousGums) {
                var myXGum = Math.random();
                myXGum = myXGum * (this.roadWidth-40) + this.environmentWidth;
                console.log(myXGum);
                this.addGum(myXGum);
            }   
        } 
        this.removeGums();

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

    // p.removeAllHoles = function () {
    //     var len = holes.length;

    //     for (var i = 0; i < len; i++) {
    //         var myHole;
    //         if (holes[i] != null) {
    //             myHole = holes[i];
                
    //             holes.splice(i, 1);
    //             stage.removeChild(myHole);
                
    //         }
    //     }
    //     console.log("num of holes: " + holes.length);
    // }


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
