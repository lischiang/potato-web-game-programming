(function () {

    window.game = window.game || {};

    var GameStates = {
        MAIN_MENU:0,
        INSTRUCTIONS:5,
        RUN_SCENE:1,
        GAME:10,
        GAME2:12,
        GAME3:14,
        GAME_OVER:20,
        GAME_WIN:30
    }

    var GameStateEvents = {
        MAIN_MENU:'main menu event',
        INSTRUCTIONS:'instructions scene',
        GAME_OVER:'game over event',
        GAME_WIN: 'game win event',
        MAIN_MENU_SELECT:'game menu select event',
        GAME:'game event',
        GAME2:'game 2 event',
        GAME3:'game 3 event'
    }

    window.game.GameStates = GameStates;
    window.game.GameStateEvents = GameStateEvents;

}());
