cc.Class({
    extends: cc.Component,

    properties: {
        Icon: cc.Sprite,
        Quantity: cc.Label
    },

    setDisplay(itemName, quantity)
    {
        this.Quantity.string = quantity;
        cc.loader.loadRes("bulk/textures/" + itemName, function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(this.Icon));
    }
    
});
