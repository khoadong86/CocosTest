var CropsIconMgr = cc.Class({
    extends: cc.Component,

    properties: {
        CropIcon: cc.Prefab, 
        display: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    statics: {
        instance: null,
    }, 

    onLoad () {
        CropsIconMgr.instance = this;
        cc.loader.loadRes("spritesheet/UI_Icon_Crop", cc.SpriteAtlas, (err, atlas) => {
            if (err) {            
                console.log(err);
            }
            else {
                this.atlasPack = atlas;
                this.init();
            }
        });

    },

    init() {
        this.dummyPos = [];
        let countItemCrop = 0;
        let cropDB = LocalDB["Crops"];
        Object.keys(cropDB).forEach( (item) => {
            const UIFrame = cropDB[item].UI_Frame;          
            this.dummyPos[countItemCrop] = this.display.getChildByName("DummyPos" + countItemCrop);
            let cropIconItem = cc.instantiate(this.CropIcon);
            cropIconItem.getComponent(cc.Sprite).spriteFrame = this.atlasPack.getSpriteFrame(UIFrame);
            cropIconItem.parent = this.display;
            cropIconItem.setPosition(this.dummyPos[countItemCrop]);
            cropIconItem.getComponent("CropIconHandle").init(item);
            countItemCrop++;
        });
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
