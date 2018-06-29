var HarvestIconMgr = cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    statics: {
        instance: null,
    }, 

    onLoad () {
        HarvestIconMgr.instance = this;
    },

    showAtPosition(pos) {
        this.node.active = true;
        this.node.setPosition(pos);
    },

    hide() {
        this.node.active = false;
    },

    start () {
    },

    // update (dt) {},
});
