var FIELD_STATUS = cc.Enum({
    INIT: 0, 
    PLANTED: 1, 
})

var CropsIconMgr = require("CropsIconMgr");
var CropsMgr = require("CropsMgr");

cc.Class({
    extends: cc.Component,
    properties: {
        FieldStatusSprite: { default:[], type: cc.SpriteFrame},
    },

    onLoad () {
        this.sprite = this.getComponent(cc.Sprite);
    },

    start () {
        this.status = FIELD_STATUS.INIT;
    },

    showUICropOverlay() {
        if (this.status == FIELD_STATUS.INIT) {
            CropsIconMgr.instance.showAtPosition(this.node.parent.convertToWorldSpace(this.node.position));//this.node.getPosition());
        } 
        else {
            CropsIconMgr.instance.hide();
        }
    },

    checkPlantCrop(cropPlantID) {
        // check condition for plant crop 
        if (this.status == FIELD_STATUS.INIT) {
            this.callPlantCrop(cropPlantID);
        }
    },

    callPlantCrop(cropPlantID) {
        this.status = FIELD_STATUS.PLANTED;
        //this.sprite.spriteFrame = this.FieldStatusSprite[FIELD_STATUS.PLANTED];
        // create crop Ingame here 
        CropsMgr.instance.createCrop(this, cropPlantID);
    },

    harvest() {
        this.status = FIELD_STATUS.INIT;
        //this.sprite.spriteFrame = this.FieldStatusSprite[FIELD_STATUS.INIT];
    }

});
