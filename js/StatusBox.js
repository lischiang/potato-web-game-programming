(function () {

    var StatusBox = function (fill, stroke, lives) {
        this.fillColor = fill;
        this.strokeColor = stroke;
        this.numOnLives = lives;
        this.initialize();
    }
    var p = StatusBox.prototype = new createjs.Container();

    // StatusBox properties

    p.width = 40;
    p.height = 400;
    p.fillColor;
    p.strokeColor;
    p.numOnLives;
    p.bar;
    p.livesText;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.drawMessagePoints();
        this.drawDistanceBar();
    }

    p.drawMessagePoints = function () {
        this.livesText = new createjs.Text('LIVES:' + this.numOnLives, '24px Comic Sans MS', '#000');
        this.livesText.y = 30;
        this.addChild(this.livesText);
    }

    p.drawDistanceBar = function () {
        //this.removeAllChildren();
        var barPositionY = 100;
        var barPositionX = 20;
        var outline = new createjs.Shape();
        outline.graphics.beginStroke(this.strokeColor);
        outline.graphics.drawRect(0, 0, this.width, this.height);
        outline.y = barPositionY;
        outline.x = barPositionX;

        this.bar = new createjs.Shape();
        this.bar.graphics.beginFill(this.fillColor);
        this.bar.graphics.drawRect(0, 0, this.width, this.height);
        this.bar.y = barPositionY;
        this.bar.x = barPositionX;
        this.bar.scaleY = 0.3;
        this.addChild(this.bar, outline);
    }

    p.updateLives = function (lives) {
        this.livesText.text = 'LIVES: ' + lives;
    }

    p.updateBar = function (perc) {
        perc = perc > 1 ? 1 : perc;
        this.bar.scaleX = perc;
    }

    window.StatusBox = StatusBox;

}());