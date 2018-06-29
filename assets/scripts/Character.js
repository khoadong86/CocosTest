
cc.Class({
    extends: cc.Component,

    properties: {
        isDragObject : true,
        rotationSpeed : 100,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.node.rotation += this.rotationSpeed*dt;
    },
});
