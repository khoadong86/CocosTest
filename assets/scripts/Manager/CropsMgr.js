var PlayerProfile = require("PlayerProfile");

var CropsMgr = cc.Class({
    extends: cc.Component,

    properties: {
        Crop: {default: null, type: cc.Prefab}
    },

    statics: {
        instance: null,
    },

    onLoad () {
        CropsMgr.instance = this;
        cc.loader.loadRes("spritesheet/Crops", cc.SpriteAtlas, (err, atlas) => {
            if (err) {            
                console.log(err);
            }
            else {
                this.atlasPack = atlas;
            }
        });
    },

    start () {
        this.databaseCrops = LocalDB["Crops"];
    },

    createCrop(field, cropPlantID) {
        let newCrop = cc.instantiate(this.Crop);
        newCrop.parent = field.node;
        let cropHandle = newCrop.getComponent("CropHandle");
        // set sprite for 3 state of Crop 
        let cropsSprites = [];
        for (let i = GameDefine.CROP_STATE.INIT; i <= GameDefine.CROP_STATE.FINISHED; i++) {
            cropsSprites[i] = this.atlasPack.getSpriteFrame(this.databaseCrops[cropPlantID].IG_Frame + (i+1)); // frame CROP_ID_[1 -> 3]
        }
        cropHandle.setFieldPlantOn(field);
        //cropHandle.setCropSprite(cropsSprites);
        cropHandle.setCropDisplay(this.databaseCrops[cropPlantID].IG_Frame);
        cropHandle.setCropParam(this.databaseCrops[cropPlantID]["Production speed (Seconds )"]);
    }
    // update (dt) {},
});

