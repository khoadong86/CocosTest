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

    getCropInfo(id) {
        for (var item in this.databaseCrops) {
            if (this.databaseCrops[item].ID == id) {
                return this.databaseCrops[item];
            }
        };
        Object.keys(this.databaseCrops).forEach( (item) => {
        });
    },

    createCrop(field, cropPlantID, start_date) {
        let newCrop = cc.instantiate(this.Crop);
        newCrop.parent = field.node;
        let cropHandle = newCrop.getComponent("CropHandle");
        // set sprite for 3 state of Crop 
        cropHandle.setFieldPlantOn(field);
        const cropData = this.getCropInfo(cropPlantID);
        cropHandle.setCropDisplay(cropData["IG_Prefab"]);
        cropHandle.setCropParam(cropData["Production speed (Seconds )"], start_date);
        return cropHandle;
    }
    // update (dt) {},
});

