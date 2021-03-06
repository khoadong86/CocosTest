var UIManager = require("UIManager");

cc.Class({
    extends: cc.Component,

    properties: {
        display: {
            default: null,
            type: cc.Sprite
        },
        ProduceZone: cc.Node
    },

    setDisplay(productId, materials)
    {
        this.productId = productId;
        this.materials = materials;

        cc.loader.loadRes("bulk/textures/" + productId, function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(this.display));
    },

    onLoad ()
    {
        this.catchedPos = this.node.position;
        this.node.on("touchstart", this.onTouchStart, this);
        this.node.on("touchmove", this.onTouchMoved);
        this.node.on("touchend", this.onTouchEnded, this);
    },

    onTouchStart(event)
    {
        //UIManager.instance.ShowProductInfo(this.productId, this.materials, this.node.position);
        let position = this.node.getParent().convertToWorldSpace(this.node.position);
        UIManager.instance.ShowProductInfo(this.productId, this.materials, position);
    },

    onTouchMoved(event)
    {
        let currentPos = this.position;
        this.setPosition(currentPos.x + event.getDelta().x / Define.Camera.Zoom.ratio, currentPos.y + event.getDelta().y / Define.Camera.Zoom.ratio);
        event.stopPropagation();
        return true;
    },

    onTouchEnded(event)
    {
        let productRect = this.node.getChildByName("Item").getBoundingBoxToWorld();
        let produceZone = this.ProduceZone.getBoundingBoxToWorld();

        if (cc.Intersection.rectRect(productRect, produceZone))
        {
            UIManager.instance.OnRequestProduce(this.productId);
        }
        else
        {
            console.log("ok not good");
        }
        UIManager.instance.HideMenu("ProductInfo");
        this.node.position = this.catchedPos;
        return true;
    }
});
