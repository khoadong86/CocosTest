var GameObject = require("GameObject");
var UIManager = require("UIManager");
var OnlineMgr = require("OnlineMgr");

var STATE = cc.Enum({
    IDLE : 0,
    ACTIVE : 1
});

cc.Class({
    extends: GameObject,

    properties: {
        idMenu: "",
        Notification: cc.Node,
        Animation: cc.Animation
    },

    onLoad()
    {
        this._super();
        this.LoadBuildingInfo();
        this.LoadCapacity();
        this.LoadProgress();
        this.SetState(STATE.IDLE);
    },

    start()
    {
        cc.director.getScheduler().schedule(this.CheckCompleteProduct, this, 1, cc.REPEAT_FOREVER, 0, false);
    },

    SetState(state)
    {
        if (this.State != state)
        {
            this.State = state;
            switch(state)
            {
                case STATE.IDLE:
                    this.Animation.pause();
                break;
                case STATE.ACTIVE:
                    this.Animation.play();
                break;
            }
        }
    },

    onClick(event)
    {
        let building = this.getComponent("Building");
        UIManager.instance.ShowBuildingMenu(this, building.idMenu, (this.node.position));
    },

    LoadBuildingInfo()
    {
        let _data = LocalDB["Production Buildings"];
        let items = Object.keys(_data);
        for (var i=0; i<items.length; i++)
        {
            let item = _data[items[i]];
            if (item["ID"] == this.node.name)
            {
                this.MaxSlot = item["Production_slots"];
                this.UnlockLevel = item["Unlock_level"];
                this.ConstructionTime = item["Construction_time"];
                return;
            }
        }
    },

    LoadCapacity()
    {
        this.capacity = {};
        let _data = LocalDB["Advanced Ingredients"];
        let items = Object.keys(_data);  
        
        for (var i=0; i<items.length; i++)
        {
            let item = _data[items[i]];
            if (item["Production_Building"] == this.node.name)
            {
                this.capacity[item.ID] = {};
                this.capacity[item.ID].Ingredient_name = item.Ingredient_name;
                this.capacity[item.ID].Production_time = item.Production_time;
                this.capacity[item.ID].Output_amount = item.Output_amount;

                let requirements = {};
                let keys = Object.keys(item);
                for (let j=0; j<keys.length; j++)
                {
                    if (keys[j].includes("Material_"))
                    {
                        let number = keys[j].substring(9, keys[j].length);
                        let material = item[keys[j]];
                        let quantity = item["Quantity_" + number];
                        requirements[material] = quantity;
                    }
                }
                this.capacity[item.ID].requirements = requirements;
            }
        }
        console.log("finish");
    },

    LoadProgress()
    {
        this.Slots = [];
        for (let i=0; i<this.MaxSlot; i++)
        {
            let slotInfo = {};
            slotInfo.Status = "Free";
            this.Slots[i] = slotInfo;
        }
    },

    OnRequestProduce(productId)
    {
        if (!this.CheckRequirement())
        {
            return false;
        }
        let freeSlot = this.getFreeSlot();
        if(freeSlot != -1)
        {
            OnlineMgr.instance.send(['produce', this.node.name, productId, freeSlot]);
        }
        return true;
    },

    getFreeSlot(){
        for (let i=0; i<this.MaxSlot; i++){
            if(this.Slots[i].Status == "Free") {
                return i;
            }
        }
        return -1;
    },

    produceProduct(productId, value) {
        if (this.Slots[value.slot].Status == "Free") {
            this.Slots[value.slot].ProductId = productId;
            this.Slots[value.slot].Production_time = value.duration;
            this.Slots[value.slot].StartTime = value.start_date;
            this.Slots[value.slot].Status = "Inprogress";
            this.Slots[value.slot].Player = FBInstantHelper.getContextPlayer(value.player);
            UIManager.instance.RefreshProductBuildingMenu();
            this.SetState(STATE.ACTIVE);
        }
    },

    CheckRequirement()
    {
        return true;
    },

    GetProductInfo(Id)
    {
        var keys = Object.keys(this.capacity);
        for (let i=0; i< keys.length; i++)
        {
            if (keys[i] == Id)
                return keys[i];
        }
        return null;
    },

    CheckCompleteProduct()
    {
        let currentTime = new Date().getTime();
        let finishProduce = true;

        for (let i=0; i<this.MaxSlot; i++)
        {
            if (this.Slots[i].Status == "Inprogress")
            {
                if ((currentTime-this.Slots[i].StartTime) >= this.Slots[i].Production_time*1000)
                {
                    this.Slots[i].Status = "Completed";
                    this.Notification.active = true;
                    return;
                }
                else
                {
                    finishProduce = false;
                }
            }
        }
        if (finishProduce)
        {
            this.SetState(STATE.IDLE);
        }
    },

    CanCollectItem(slot) {
        return (this.Slots[slot].Status == "Completed");
    },

    CallCollectItem(slot) {
        this.Slots[slot].Status = "Requesting";
        OnlineMgr.instance.send(['collect', this.node.name, slot])
    },

    CollectCompleteItem(slot)
    {
        if (this.Slots[slot].Status == "Requesting")
        {
            this.Slots[slot].Status = "Free";
            UIManager.instance.RefreshProductBuildingMenu();

            let completedSlot = this.Slots.filter(it => it.Status == "Completed");
            this.Notification.active = completedSlot.length > 0;
        }
    }
});
