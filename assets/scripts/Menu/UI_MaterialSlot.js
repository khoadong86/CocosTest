// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        MaterialIcon: cc.Sprite,
        AmountText: cc.Label,
        LayoutRed: cc.Node,
        LayoutGreen: cc.Node
    },

    setDisplay(name, amount)
    {
        cc.loader.loadRes("bulk/textures/" + name, function(err, data) {

            this.spriteFrame = new cc.SpriteFrame(data);
            
        }.bind(this.MaterialIcon));
        let currentAmount = FarmProfile.instance.profileData.inventory[name];

        if (currentAmount && currentAmount > 0)
            this.AmountText.string = currentAmount + "/" + amount;
        else
            this.AmountText.string = "0/" + amount;

        if (currentAmount >= amount)
        {
            this.LayoutRed.active = false;
            this.LayoutGreen.active = true;
        }
        else
        {
            this.LayoutRed.active = true;
            this.LayoutGreen.active = false;
        }

        this.node.active = true;
    }
});
