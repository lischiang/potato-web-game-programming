(function () {

    window.game = window.game || {};

    var GameStates = {
        MAIN_MENU:0,
        INSTRUCTIONS:5,
        RUN_SCENE:1,
        GAME:10,
        GAME:12,
        GAME_OVER:20
    }

    var GameStateEvents = {
        MAIN_MENU:'main menu event',
        INSTRUCTIONS:'instructions scene',
        GAME_OVER:'game over event',
        MAIN_MENU_SELECT:'game menu select event',
        GAME:'game event',
        GAME2:'game 2 event'
    }

    window.game.GameStates = GameStates;
    window.game.GameStateEvents = GameStateEvents;

}());
