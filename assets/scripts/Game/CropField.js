// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var UIMgr = require("UIMgr");

cc.Class({
    extends: cc.Component,
    properties: {
        FieldStatusSprite: { default:[], type: cc.SpriteFrame},
    },

    // onLoad () {},

    start () {
        this.uiMgr = cc.find("Canvas").getComponent("UIMgr");
    },

    showUICropOverlay() {
        this.uiMgr.showCropUIOverlay();
    },
    // update (dt) {},
});
