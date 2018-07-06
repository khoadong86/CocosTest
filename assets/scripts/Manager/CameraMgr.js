// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var CameraMgr = cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {
            default: null,
            type: cc.Node,
        },
        background: {
            default: null,
            type: cc.Node,
        },
    },

    statics: {
        instance: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        CameraMgr.instance = this;
    },

    start () {
        this.camera = this.getComponent(cc.Camera);
    },

    getOffsetPosition() {
        let offset = new cc.Vec2();
        this.node.position.sub(this.canvas.position, offset);

        return offset.mulSelf(this.camera.zoomRatio);
    },  

    update (dt) {
        var camera = this.getComponent(cc.Camera);
        var viewPort = camera.viewPort.clone();
        var bg = this.background.getBoundingBoxToWorld();
        var shiftR=0, shiftL=0;
        var shiftU = 0, shiftD=0;
        
        // Left compare
        if (viewPort.x < bg.x) {
            shiftR = bg.x - viewPort.x
        }

        // Right compare
        else if ((viewPort.x + viewPort.width) > (bg.x + bg.width)) {
            shiftL = (bg.x + bg.width) - (viewPort.x + viewPort.width);
        }

        // Bottom compare
        if (viewPort.y < bg.y) {
            shiftU = bg.y - viewPort.y
        }

        // Top compare
        else if ((viewPort.y + viewPort.height) > (bg.y + bg.height)) {
            shiftD = (bg.y + bg.height) - (viewPort.y + viewPort.height);
        }

        this.node.setPosition(this.node.x + (shiftL || shiftR), this.node.y + (shiftU || shiftD));
    },
});
