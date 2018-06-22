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
        UICropOverlay: {default: null, type: cc.Node},
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on('ShowCropFieldUI', this.showCropOverlay, this);
    },

    destroy() {
        this._super();
        this.node.off('ShowCropFieldUI', this.showCropOverlay, this);
    },

    showCropUIOverlay: function() {
        console.log("show overlay crop UI");
        this.UICropOverlay.active = true;
    },
    // update (dt) {},
});

//module.exports = UIMgr;