var GameObject = require("GameObject");
var UIManager = require("UIManager");

cc.Class({
    extends: GameObject,

    properties: {
        idMenu: "",
        Notification: cc.Node
    },

    onLoad()
    {
        this._super();
        this.LoadBuildingInfo();
        this.LoadCapacity();
        this.LoadProgress();
    },

    start()
    {
        cc.director.getScheduler().schedule(this.CheckCompleteProduct, this, 1, cc.REPEAT_FOREVER, 0, false);
    },

    onClick(event)
    {
        this.getComponent("Building").CollectCompleteItem();
        UIManager.instance.ShowBuildingMenu(this, this.getComponent("Building").idMenu, this.getParent().convertToWorldSpace(this.position));
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
                this.capacity[items[i]] = {};
                this.capacity[items[i]].Ingredient_name = item.Ingredient_name;
                this.capacity[items[i]].Production_time = item.Production_time;
                this.capacity[items[i]].Output_amount = item.Output_amount;

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
                this.capacity[items[i]].requirements = requirements;
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

        for (let i=0; i<this.MaxSlot; i++)
        {
            if (this.Slots[i].Status == "Free")
            {
                this.Slots[i].ProductId = productId;
                this.Slots[i].Production_time = this.capacity[productId].Production_time;
                this.Slots[i].StartTime = new Date().getTime();
                this.Slots[i].Status = "Inprogress";
                return true;
            }
        }
        return false;
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
            }
        }
    },

    CollectCompleteItem()
    {
        for (let i=0; i<this.MaxSlot; i++)
        {
            if (this.Slots[i].Status == "Completed")
            {
                this.Slots[i].Status = "Free";
                //dnvuanh add code collect here
            }
        }
        this.Notification.active = false;
    }
});
