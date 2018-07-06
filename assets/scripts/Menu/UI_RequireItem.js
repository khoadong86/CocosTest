var FarmProfile = require("FarmProfile");

cc.Class({
    extends: cc.Component,

    properties: {
        Icon: {
            default: null,
            type:cc.Sprite
        },
        Progress: cc.ProgressBar,
        ProgressText: cc.Label,
    },

    setDisplay(itemName, quantity)
    {
        cc.loader.loadRes("bulk/textures/" + itemName, function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(this.Icon));

        let current = FarmProfile.instance.profileData.inventory[itemName];
        if (!current)
        {
            current = 0;
        }

        this.Progress.progress = current / quantity;
        this.ProgressText.string = current + "/" + quantity;
    }
});
