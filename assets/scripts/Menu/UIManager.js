var UIManager = cc.Class({
    extends: cc.Component,

    properties: {
        ProductBuilding: cc.Prefab,
        ProductMaterial: cc.Prefab,
        Inventory: cc.Prefab,
        LoadingScreen: cc.Prefab,
        Notification: cc.Prefab,
        PopupQuestPrefab: cc.Prefab,
        notifyTimeout: 3,
    },

    onLoad(){
        UIManager.instance = this;
	    /*this.node.children.forEach(element => {
            element.active = false;
        });*/
        this.initCanvasMenu();
        this.initInGameFloatingMenu();
        this.initPopups();
    },

    statics:
    {
        instance: null
    },

    initInGameFloatingMenu(){
        let gameNode = cc.find("Game", this.node.getParent());
        this.ProductBuilding = cc.instantiate(this.ProductBuilding).getComponent("UI_ProductBuilding");
        this.ProductMaterial = cc.instantiate(this.ProductMaterial).getComponent("UI_ProductMaterial");
        // add to game node
        gameNode.addChild(this.ProductBuilding.node);
        gameNode.addChild(this.ProductMaterial.node);
        // deactive
        this.ProductBuilding.node.active = false;
        this.ProductMaterial.node.active = false;
    },

    initCanvasMenu(){
        let canvasNode = cc.find("Canvas");
        
        this.Notification = cc.instantiate(this.Notification).getComponent("Notification");
        this.Inventory = cc.instantiate(this.Inventory).getComponent("Inventory");
        this.LoadingScreen = cc.instantiate(this.LoadingScreen);
        // add to canvas node
        canvasNode.addChild(this.Notification.node); // to align top-screen
        canvasNode.addChild(this.Inventory.node);

        // NOTE: always add loading screen at the bottom of the screen
        canvasNode.addChild(this.LoadingScreen);
        // deactive
        this.Notification.node.active = false;
        this.Inventory.node.active = false;
    },
    initPopups()
    {
        let gameNode = cc.find("Game", this.node.getParent());
        this.PopupQuestComplete = cc.instantiate(this.PopupQuestPrefab).getComponent("UI_PopupQuestComplete");
        this.node.addChild(this.PopupQuestComplete.node);
        this.PopupQuestComplete.node.active = false;
        console.log("init popup quest");
    },

    initNotification(){
        this.notificationPrefab = cc.instantiate(this.notificationPrefab);
        this.notificationPopup = this.notificationPrefab.getComponent("Notification");
        this.notificationPrefab.active = false;
        this.notificationPrefab.parent = cc.find("Canvas"); // to align top-screen
    },

    showNotification(content) {
        if(!this.Notification.node.active)
            this.Notification.node.active = true;
        this.Notification.setText(content);
        this.Notification.show();
        if(this.noticeTimeout)
            clearTimeout(this.noticeTimeout);
        this.noticeTimeout = setTimeout(this.Notification.hide.bind(this.Notification), this.notifyTimeout * 1000);
    },

    ShowLoadingScreen() {
        this.LoadingScreen.active = true;
    },

    HideLoadingScreen() {
        this.LoadingScreen.active = false;
    },

    ShowInventory(){
        this.Inventory.node.active = true;
    },

    ShowBuildingMenu(caller, name, position)
    {
        this.caller = caller;
        switch (name)
        {
            case "ProductBuilding":
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
            this.caller.getComponent("Building").OnRequestProduce(productId);
        }
    },

    RefreshProductBuildingMenu(){
        this.ProductBuilding.Refresh();
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

    ShowQuestComplete(QuestID)
    {
        this.PopupQuestComplete.showPopup(QuestID);
        this.PopupQuestComplete.node.active = true;
    }
});