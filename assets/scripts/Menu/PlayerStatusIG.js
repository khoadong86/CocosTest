cc.Class({
    extends: cc.Component,

    properties: {
        statusImage: cc.Sprite,
    },

    initWithTexture(texture) {
        this.statusImage.spriteFrame = new cc.SpriteFrame(texture);
    },

    initWithSpriteFrame(spriteFrame) {
        this.statusImage.spriteFrame = spriteFrame;
    },

    onDestroyNode() {
        if (this.node) this.node.destroy();
    },
});
