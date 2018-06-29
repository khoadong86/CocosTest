cc.Class({
    extends: cc.Component,

    properties: {
        innerText: cc.Label
    },
    onLoad(){
        this.animator = this.node.getComponent(cc.Animation);
    },

    start () {
    },

    show() {
        this.animator.play('notification-show');
        cc.log("show");
    },

    hide() {
        this.animator.play('notification-hide');
    },

    setText(text) {
        this.innerText.string = text;
    }
});
