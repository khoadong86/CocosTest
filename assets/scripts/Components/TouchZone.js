// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const MAX_DRAG_OFFSET = 5;
cc.Class({
    extends: cc.Component,

    properties: {
        onClickListeners:[cc.Component.EventHandler],
        stopPropagation:false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("touchstart", (event)=>{this.isClick=true;if(this.stopPropagation) event.stopPropagation();}, this);
        this.node.on("touchmove", (event)=>{if(this.isClick) {this.isClick = event.touch.getDelta().mag() < MAX_DRAG_OFFSET;};if(this.stopPropagation) event.stopPropagation();}, this);
        this.node.on("touchend", (event)=>{if(this.isClick){this.onClick();}this.isClick=false;if(this.stopPropagation) event.stopPropagation();}, this);
    },
    
    onClick(){
        for(let i in this.onClickListeners){
            this.onClickListeners[i].emit();
        }
    }

    // update (dt) {},
});
