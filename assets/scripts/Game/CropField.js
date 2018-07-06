
var FIELD_STATUS = cc.Enum({
    INIT: 0,
    REQUESTING: 1,
    PLANTED: 2,
})

var OnlineMgr = require("OnlineMgr");
var CropsIconMgr = require("CropsIconMgr");
var CropsMgr = require("CropsMgr");

cc.Class({
    extends: cc.Component,
    properties: {
        collider:{default:null, type: cc.PolygonCollider},
    },

    onLoad() {
        this.sprite = this.getComponent(cc.Sprite);
    },

    start() {
        this.status = FIELD_STATUS.INIT;
        this.previousStatus = this.status;
        this.plantedId = 0;
        this.cropPlantHandle = null;
    },

    showUICropIcon() {
        if (this.status == FIELD_STATUS.INIT) {
            CropsIconMgr.instance.showAtPosition(this.node.parent.convertToWorldSpace(this.node.position));//this.node.getPosition());
        }
        else {
            CropsIconMgr.instance.hide();
        }
    },

    canPlantCrop(cropPlantID) {
        // check condition for plant crop 
        return this.status == FIELD_STATUS.INIT && FarmProfile.instance.getItemQuantity(cropPlantID) > 0;
    },

    callPlantCrop(cropPlantID) {
        this.plantedId = cropPlantID;
        // create crop Ingame here 
        this.setNextStatus(FIELD_STATUS.REQUESTING);
        let names = this.node.name.split('-');
        OnlineMgr.instance.send(['produce', names[0], this.plantedId, names[1]]);
    },

    plantCrop(cropPlantID) {
        if (this.canPlantCrop(cropPlantID)) {
            this.callPlantCrop(cropPlantID);
            return true;
        }
        return false;
    },

    // sync online state 
    syncCropPlanted(cropPlantID, start_date) {
        this.setNextStatus(FIELD_STATUS.PLANTED);
        this.plantedId = cropPlantID;
        // create crop Ingame here 
        this.cropPlantHandle = CropsMgr.instance.createCrop(this, cropPlantID, start_date);
    },

    syncCropFieldCollected() {
        this.cropPlantHandle.syncCropCollect();
    },

    syncError() {
        this.status = this.previousStatus;
    },

    harvest() {
        if (this.status == FIELD_STATUS.PLANTED) {
            this.setNextStatus(FIELD_STATUS.REQUESTING);
            let names = this.node.name.split('-');
            OnlineMgr.instance.send(['collect', names[0], names[1]]);
        }
    }, 

    syncHarvest() {
        this.setNextStatus(FIELD_STATUS.INIT);
    },

    setNextStatus(status) {
        this.previousStatus = this.status;
        this.status = status;
    },
});
