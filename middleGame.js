/**
 * Created by lfgcas on 2017-07-28.
 */

(function (window) {

    window.game = window.game || {}

    function middleGame() {
        this.initialize();
    }

    var p = middleGame.prototype;

    p.currentGameStateFunction;
    p.currentGameState;
    p.currentScene;
    p.count = 0;

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
        var scene = new game.Game();
        scene.on(game.GameStateEvents.GAME2, this.onStateEvent, this, false, {state: game.GameStates.GAME2});
        scene.on(game.GameStateEvents.GAME_OVER, this.onStateEvent, this, false, {state: game.GameStates.GAME_OVER});
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;

        this.changeState(game.GameStates.RUN_SCENE);

        this.addHoles((Math.random() * (1 - 0) + 0) + 200);

        createjs.Ticker.on('tick', this.addNewHoles, this);


        character = new createjs.Shape();
        character.graphics.beginFill('#A00').drawRect(0, 0, 30, 100);
        character.name = 'myCharacter';
        character.x = 400;
        character.y = 450;
        character.width = 30;
        character.height = 100;
        character.nextX = 400
        stage.addChild(character);
    }

    p.gameStateGame2 = function () {
        var scene = new game.Game2();
        scene.on(game.GameStateEvents.GAME_OVER, this.onStateEvent, this, false, {state: game.GameStates.GAME_OVER});
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, {state: game.GameStates.MAIN_MENU});
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;

        this.changeState(game.GameStates.RUN_SCENE);

        this.addHoles((Math.random() * (1 - 0) + 0) + 200);

        createjs.Ticker.on('tick', this.addNewHoles, this);


        character = new createjs.Shape();
        character.graphics.beginFill('#A00').drawRect(0, 0, 30, 100);
        character.name = 'myCharacter';
        character.x = 400;
        character.y = 450;
        character.width = 30;
        character.height = 100;
        character.nextX = 400
        stage.addChild(character);
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


    p.addHoles = function (myX) {

        //var hole = new createjs.Shape();
        //hole = new createjs.Shape();
        //hole.graphics.beginFill('#000').drawRect(0, 0, 10, 10);

        hole = new createjs.Bitmap('img/hole.png')
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

    p.addNewHoles = function () {
        var len = holes.length;
        var myY = Math.random() * (1 - 0) + 0;
        myY = myY*600;
        var numberOfSimultaneousHoles = 4;
        if (holes[0].y >= myY ) {
            if (len <= numberOfSimultaneousHoles) {
                var myX = Math.random() * (1 - 0) + 0;
                myX = myX * 400 + 200;
                //console.log(myX);

                this.addHoles(myX);

            }
        }

        this.removeHoles();


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

    window.game.middleGame = middleGame;

}(window));
