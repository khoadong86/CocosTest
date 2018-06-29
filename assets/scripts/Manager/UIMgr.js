
cc.Class({
    extends: cc.Component,

    properties: {
        UICropOverlay: {default: null, type: cc.Node},
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    destroy() {
        this._super();
    },

    showCropUIOverlay: function() {
        console.log("show overlay crop UI");
        this.UICropOverlay.active = true;
    },
    // update (dt) {},
});

//module.exports = UIMgr;