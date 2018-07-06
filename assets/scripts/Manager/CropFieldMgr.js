var CameraMgr = require("CameraMgr");
cc.Class({
    extends: cc.Component,

    properties: {
        //testTouch: {default:null, type: cc.Node},
    },

    start() {
        /*
        this.fieldColliders = [];
        var childNodes = this.node._children;
        for (let i = 0; i < childNodes.length; i++) {
            this.fieldColliders[i] = childNodes[i].getComponent(cc.PolygonCollider);
        }
        //this.node.on(cc.Node.EventType.TOUCH_START, this.dragStart, this);
        //this.node.on(cc.Node.EventType.TOUCH_END, this.dragEnd, this);
        //cc.director.getCollisionManager().enabledDebugDraw = true;
        */
    },

    dragStart(event) {
        cc.director.getCollisionManager().enabled = true;
        let touch = event._touches[0];
        let point = this.node.convertTouchToNodeSpace(touch);
        let offsetPos = CameraMgr.instance.getOffsetPosition();
        point.addSelf(offsetPos);
        let pos = this.node.convertToWorldSpace(point);
        //this.testTouch.setPosition(point);
        //pos.addSelf(offsetPos);
        for (let i = 0; i < this.fieldColliders.length; i++) {
            if (cc.Intersection.pointInPolygon(pos, this.fieldColliders[i].world.points)) {
                console.log("touch in ");
                this.fieldColliders[i].node.getComponent("CropField").showUICropIcon();
            }
        }
    },

    dragEnd(event) {
        cc.director.getCollisionManager().enabled = true;
    },


    // update (dt) {},
});
