cc.Class({
    extends: cc.Component,

    properties: {
        ProductNode: cc.Node,
        QueueNode: cc.Node,
    },

    onLoad()
    {
        this.Products = [];
        this.Slots = [];
        let id;
        for(id in this.ProductNode.children) this.Products.push(this.ProductNode.children[id].getComponent("UI_ProductItem"));
        for(id in this.QueueNode.children) this.Slots.push(this.QueueNode.children[id].getComponent("UI_ProductSlot"));

        this.registerClickOnSlots();
    },

    registerClickOnSlots(){
        for(let i in this.Slots) {
            this.Slots[i].onClick = this.onSlotClicked.bind(this);
        }
    },

    onSlotClicked(slot) {
        if(this.caller) {
            let id = this.Slots.indexOf(slot);
            if(id != -1) {
                if(this.caller.CanCollectItem(id))
                    this.caller.CallCollectItem(id);
            }
        }
    },

    LoadBuildingInfo(caller)
    {
        this.caller = caller;
        this.Products.forEach(element => {
            element.node.active = false;
        });
        this.Refresh();
    },

    Refresh(){
        if(this.caller) {
            let selectedBuilding = this.caller.getComponent("Building");
            this.UpdateItems(selectedBuilding);
            this.UpdateProgress(selectedBuilding.Slots);
        }
    },

    UpdateItems(selectedBuilding){
        let capacity = selectedBuilding.capacity;
        let items = Object.keys(capacity);
        for (var i=0; i<items.length; i++)
        {
            this.Products[i].setDisplay(items[i],capacity[items[i]]);
            this.Products[i].node.active = true;
        }
    },

    UpdateProgress(data)
    {
        for (let i=0; i<this.Slots.length; i++)
        {
            if (i < data.length)
            {
                this.Slots[i].setDisplay(data[i]);
            }
        }
    },

    Display(position)
    {
        this.node.active = true;
        this.node.setPosition(position);
        // cc.log(this, "Display at", position);
    },

    Hide()
    {
        this.caller = null;
        this.node.active = false;
    },

    onProduceCall(event)
    {
        console.log("testtt");
    },
});
