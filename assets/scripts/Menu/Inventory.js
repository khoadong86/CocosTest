var FarmProfile = require("FarmProfile");
cc.Class({
    extends: cc.Component,

    properties: {
        ItemPrefab: cc.Prefab,
        Content: cc.Node
    },
    onLoad: function onLoad() {
        this.inventory = {};
    },
    registerEventClose(callback){
        cc.log(this.closeButton);
    },
    updateInventory: function updateInventory() {
        if (!FarmProfile.instance) return;
        var farmInventory = FarmProfile.instance.profileData.inventory;
        for (var item_id in farmInventory) {
            if(item_id == 'coin') continue;
            
            if (this.inventory[item_id]) {
                // update quantity only
                this.inventory[item_id].setQuantity(farmInventory[item_id]);
            } else {
                var item = AssetHelper.GetItemByString(item_id);
                var invItem = cc.instantiate(this.ItemPrefab).getComponent("InventoryItem");
                invItem.setIcon(item.UI_Frame);
                invItem.setQuantity(farmInventory[item_id]);
                this.Content.addChild(invItem.node);
                this.inventory[item_id] = invItem; // save item
            }
        }
    },
    onEnable: function onEnable() {
        // update quantity
        this.updateInventory();
    },
    closeInventory() {
        this.node.active = false;
    }
});