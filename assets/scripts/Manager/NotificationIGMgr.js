
var NotificationIGMgr = cc.Class({
    extends: cc.Component,

    properties: {
        playerStatusIG: {
            default: null, 
            type: cc.Prefab,
        }, 
        markFrame: {
            default: null, 
            type: cc.SpriteFrame,
        },
    },

    statics: {
        instance: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        NotificationIGMgr.instance = this;
        this.avatarCache = {};
    },

    start () {

    },

    createNotificationIG(nodeAttach, playerID) {
        let avatarPopup = cc.instantiate(this.playerStatusIG).getComponent("PlayerStatusIG");
        nodeAttach.addChild(avatarPopup.node);
        //avatarPopup.setPosition(nodeAttach.parent.convertToWorldSpace(nodeAttach.position));
        if (playerID == "error")
        {
            avatarPopup.initWithSpriteFrame(this.markFrame);
        }
        else {
            avatarPopup.initWithTexture(ImageCached.Get(playerID));
        }
    }

    // update (dt) {},
});
