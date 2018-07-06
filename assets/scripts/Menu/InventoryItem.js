cc.Class({
    extends: cc.Component,

    properties: {
        icon: cc.Sprite,
        quantity: cc.Label
    },
    setQuantity(quantity){
        this.quantity.string = "x" + quantity;
    },
    setIcon(icon) {
        let self = this;
        cc.loader.loadRes("spritesheet/" + icon, (err, data)=>{
            if (err) { 
                cc.error(err);
            } else {
                self.icon.spriteFrame = new cc.SpriteFrame(data);
            }
        });
    }
});
