// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad ()
    {
        var self = this;
        this.catchedPos = this.node.position;
        this.node.on("touchmove", this.onTouchMoved);
        this.node.on("touchend", this.onTouchEnded.bind(self));
    },

    onTouchStart(event)
    {

    },

    onTouchMoved(event)
    {
        let currentPos = this.position;
        this.setPosition(currentPos.x + event.getDelta().x, currentPos.y + event.getDelta().y)
        return true;
    },

    onTouchEnded(event)
    {
        this.node.setPosition(this.catchedPos.x, this.catchedPos.y);
    }
});
