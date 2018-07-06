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
        this.node.on('drag_start', this.onIconDragStart, this);
        this.node.on('drag_end', this.onIconDragEnd, this);
    },

    onIconDragStart(event) {
        let IconController = event.target;
        IconController.parent = this.node;
        this.display.active = false;
    }, 

    onIconDragEnd(event) {
        this.display.active = true;
        let IconController = event.target;
        IconController.parent = this.display;
        this.hide();
    },

    init() {
        this.dummyPos = [];
        this.cropsIconHandle = [];
        let countItemCrop = 0;
        let cropDB = LocalDB["Crops"];
        Object.keys(cropDB).forEach( (item) => {
            const UIFrame = cropDB[item].UI_Frame;          
            this.dummyPos[countItemCrop] = this.display.getChildByName("DummyPos" + countItemCrop);
            let cropIconItem = cc.instantiate(this.CropIcon);
            cropIconItem.getComponent(cc.Sprite).spriteFrame = this.atlasPack.getSpriteFrame(UIFrame);
            cropIconItem.parent = this.display;
            cropIconItem.setPosition(this.dummyPos[countItemCrop]);
            let cropIconHandle = { id: cropDB[item]["ID"], icon: cropIconItem.getComponent("CropIconHandle") };
            cropIconHandle.icon.init(item, FarmProfile.instance.getItemQuantity(cropDB[item]["ID"]));
            this.cropsIconHandle.push(cropIconHandle);
            countItemCrop++;
        });
    },

    updateInfo() {
        this.cropsIconHandle.forEach( (element) => {
            const cropIDstring = element.id;
            element.icon.init(cropIDstring, FarmProfile.instance.getItemQuantity(cropIDstring));
        });
    },

    showAtPosition(pos) {
        this.updateInfo();
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
