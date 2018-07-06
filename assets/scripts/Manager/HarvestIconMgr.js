var HarvestIconMgr = cc.Class({
    extends: cc.Component,

    properties: {
        display:{default:null, type: cc.Node},
    },

    // LIFE-CYCLE CALLBACKS:

    statics: {
        instance: null,
    }, 

    onLoad () {
        HarvestIconMgr.instance = this;
        this.node.on('drag_start', this.onIconDragStart, this);
        this.node.on('drag_end', this.onIconDragEnd, this);
    },

    onIconDragStart(event) {
        this.display.active = false;
    }, 

    onIconDragEnd(event) {
        this.hide();
    },

    showAtPosition(pos) {
        this.node.active = true;
        this.node.setPosition(pos);
    },

    hide() {
        this.node.active = false;
    },

    start () {
    },

    // update (dt) {},
});
