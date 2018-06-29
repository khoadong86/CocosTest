var ObjectTypes = cc.Enum({
    UNKNOWN : 0,
    PRODUCT_BUILDING: 1,
});

cc.Class({
    extends: cc.Component,

    properties: {
        ObjectType: {
            "default": ObjectTypes.UNKNOWN,
            type: ObjectTypes
        },
        IsClickable: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad ()
    {
        if (this.IsClickable)
        {
            this.node.on("touchstart", this.onClick).bind(this);
        }
    },

    start () 
    {
        
    },
    
    onClick(event)
    {
        console.log("onClick " + this.name);
    }

    // update (dt) {},
});