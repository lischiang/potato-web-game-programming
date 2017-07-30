(function () {

    window.game = window.game || {};

    var GameStates = {
        INSTRUCTIONS:5,
        RUN_SCENE:1,
        GAME:10,
        SCORE_SCREEN:11,
        GAME_OVER:20
    }

    var GameStateEvents = {
        INSTRUCTIONS:'instructions scene',
        GAME_OVER:'game over event',
        MAIN_MENU_SELECT:'game menu select event',
        GAME:'game event',
        SCORE_SCREEN:'score screen event'
    }

    window.game.GameStates = GameStates;
    window.game.GameStateEvents = GameStateEvents;

}());
