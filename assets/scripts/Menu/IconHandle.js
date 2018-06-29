var ITEM_STATUS = cc.Enum({
    INIT: 0,
    PICKUP: 1,
    RELEASE: 2,
});
 

cc.Class({
    extends: cc.Component,

    properties: {
        propagate: {
            default: false
        },
    },

    onLoad () {
        this.node.opacity = 255;
        this.node.on(cc.Node.EventType.TOUCH_START, this.dragStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.dragMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.dragEnd, this);
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    dragStart() {
        this.initPos = this.node.getPosition();
        cc.log('Drag stated ...');
        this.node.opacity = 255;
        cc.director.getCollisionManager().enabled = true;
        this.status = ITEM_STATUS.PICKUP;
    },

    dragMove(event) {
        this.node.opacity = 160;
        var delta = event.touch.getDelta();
        this.node.x += delta.x;
        this.node.y += delta.y;
    },

    dragEnd(event) {
        this.node.opacity = 255;
        this.node.setPosition(this.initPos);
        cc.director.getCollisionManager().enabled = false;
        this.status = ITEM_STATUS.INIT;
    },

    isPickup() {
        return this.status == ITEM_STATUS.PICKUP;
    },

    start () {
        this.status = ITEM_STATUS.INIT;
        cc.director.getCollisionManager().enabled = false;
    },
});
