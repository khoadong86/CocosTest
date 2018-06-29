cc.Class({
    extends: cc.Component,

    properties: {
        statusImage: cc.Sprite,
        playerName: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:
    init(data) {
        this.playerName.string = data.name;
        this.statusImage.spriteFrame = new cc.SpriteFrame(data.texture);
    }
});
