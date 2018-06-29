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
        this.node.on("touchstart", function(event){

        }),

        this.node.on("touchmove", function(event){
            let currentPos = this.node.position;
            this.node.setPosition(currentPos.x + event.getDelta().x, currentPos.y + event.getDelta().y)
            return true;
        }.bind(this));

        this.node.on("touchend", function(event){
            console.log("touchend");
        })
    }
});
