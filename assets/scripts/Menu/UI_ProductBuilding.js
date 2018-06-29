cc.Class({
    extends: cc.Component,

    properties: {
        ProductNode: cc.Node,
        QueueNode: cc.Node,
    },

    onLoad()
    {
        this.Products = this.ProductNode.children;
        this.Slots = this.QueueNode.children;
    },

    LoadBuildingInfo(caller)
    {
        this.caller = caller;
        let count = 0;

        this.Products.forEach(element => {
            element.active = false;
        });

        let capacity = this.caller.getComponent("Building").capacity;
        let items = Object.keys(capacity);

        for (var i=0; i<items.length; i++)
        {
            this.Products[i].getComponent("UI_ProductItem").setDisplay(items[i],capacity[items[i]]);
            this.Products[i].active = true;
        }

        this.UpdateProgress(this.caller.getComponent("Building").Slots);
    },

    UpdateProgress(data)
    {
        for (let i=0; i<this.Slots.length; i++)
        {
            if (i < data.length)
            {
                this.Slots[i].getComponent("UI_ProductSlot").setDisplay(data[i]);
            }
        }
    },

    Display(position)
    {
        this.node.setPosition(position);
        this.node.active = true;
    },

    Hide()
    {
        this.node.active = false;
    },

    onProduceCall(event)
    {
        console.log("testtt");
    },
});
