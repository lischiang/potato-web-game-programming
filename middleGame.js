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
    p.count=0;

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
            case game.GameStates.RUN_SCENE:
                this.currentGameStateFunction = this.gameStateRunScene;
                break;
            // case game.GameStates.GAME_OVER:
            //     this.currentGameStateFunction = this.gameStateGameOver;
            //     break;
        }
    }
    p.onStateEvent = function (e, data) {
        this.changeState(data.state);
    }
    p.gameStateGameMenu = function () {
        var scene = new game.GameMenu();
        scene.on(game.GameStateEvents.INSTRUCTIONS, this.onStateEvent, this, false, { state: game.GameStates.INSTRUCTIONS });
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }
    p.gameStateInstructions = function () {
        var scene = new game.GameInstructions();
        scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, false, {state:game.GameStates.GAME});
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }
    p.gameStateGame = function () {
        var scene = new game.Game();
        scene.on(game.GameStateEvents.INSTRUCTIONS, this.onStateEvent, this, false, {state:game.GameStates.INSTRUCTIONS});
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }
    // p.gameStateGameOver = function () {
    //     var scene = new game.GameOver();
    //     stage.addChild(scene);
    //     scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, {state:game.GameStates.MAIN_MENU});
    //     scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, false, {state:game.GameStates.GAME});
    //     stage.removeChild(this.currentScene);
    //     this.currentScene = scene;
    //     this.changeState(game.GameStates.RUN_SCENE);
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

    window.game.middleGame = middleGame;

}(window));
