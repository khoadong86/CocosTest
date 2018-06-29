var UI_ProductBuilding = require("UI_ProductBuilding");
var UI_ProductMaterial = require("UI_ProductMaterial");

var UIManager = cc.Class({
    extends: cc.Component,

    properties: {
        ProductBuilding: UI_ProductBuilding,
        ProductMaterial: UI_ProductMaterial,
        notificationPrefab: cc.Prefab,
        notifyTimeout: 3,
    },

    onLoad(){
        UIManager.instance = this;
        this.initNotification();
	    this.node.children.forEach(element => {
            element.active = false;
        });
    },

    statics:
    {
        instance: null
    },

    initNotification(){
        this.notificationPrefab = cc.instantiate(this.notificationPrefab);
        this.notificationPopup = this.notificationPrefab.getComponent("Notification");
        this.notificationPrefab.active = false;
        this.notificationPrefab.parent = cc.find("Canvas"); // to align top-screen
    },

    showNotification(content) {
        if(!this.notificationPrefab.active)
            this.notificationPrefab.active = true;
        this.notificationPopup.setText(content);
        this.notificationPopup.show();
        if(this.noticeTimeout)
            clearTimeout(this.noticeTimeout);
        this.noticeTimeout = setTimeout(this.notificationPopup.hide.bind(this.notificationPopup), this.notifyTimeout * 1000);
    },

    ShowBuildingMenu(caller, name, position)
    {
        this.caller = caller;
        this.showNotification("Select building : " + caller.name);
        switch (name)
        {
            case "ProductBuilding":
                this.ProductBuilding.node.active = true;
                this.ProductBuilding.LoadBuildingInfo(caller);
                this.ProductBuilding.Display(position);
                break;
        }
    },

    ShowProductInfo(name, materials, position)
    {
        this.ProductMaterial.setDisplay(name, materials, position);
    },

    OnRequestProduce(productId)
    {
        console.log("On request produce " + productId + " caller " + this.caller.name);
        if (this.caller != null)
        {
            let building = this.caller.getComponent("Building");
            let result = building.OnRequestProduce(productId);
            if (result)
            {
                this.ProductBuilding.UpdateProgress(building.Slots)
            }
        }
    },

    HideMenu(name)
    {
        switch (name)
        {
            case "ProductBuilding":
                this.ProductBuilding.node.active = false;
            break;

            case "ProductInfo":
                this.ProductMaterial.node.active = false;
            break;
        }
    },
});