var ObjectTypes = cc.Enum({
    UNKNOWN : 0,
    PRODUCT_BUILDING: 1,
});

const MAX_DRAG_OFFSET = 5;

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
            this.node.on("touchstart", (event)=>{this.isClick=true;if(this.stopPropagation) event.stopPropagation();}, this);
            this.node.on("touchmove", (event)=>{if(this.isClick) {this.isClick = event.touch.getDelta().mag() < MAX_DRAG_OFFSET;};if(this.stopPropagation) event.stopPropagation();}, this);
            this.node.on("touchend", (event)=>{if(this.isClick){this.onClick();}this.isClick=false;if(this.stopPropagation) event.stopPropagation();}, this);
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