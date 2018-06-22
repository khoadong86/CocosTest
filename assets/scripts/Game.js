// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const Buildings = require("Buildings");

cc.Class({

    extends: cc.Component,

    properties: {
        gameCamera: cc.Camera,
        ClickedParticle: cc.Prefab, 
        InitNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (!LoadedResource)
        {
            ObjectSpawner.InitPools(this.GameInit.bind(this));
            LoadedResource = true;
        }
        else
        {
            this.GameInit();
        }
    },

    start () {
        console.log("Start");
    },

    GameInit()
    {
        this.InitMap(Buildings);
        this.InitInput();
    },

    InitInput()
    {

        var self = this;
        self.distanceBegin = 0;
        self.distanceEnd = 0;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            swallowTouches: false,

            onTouchesBegan: function(touches, event) {
                if (touches.length > 1)
                {
                    self.distanceBegin = Math.sqrt(Math.pow(touches[0]._point.x - touches[1]._point.x, 2) + Math.pow(touches[0]._point.y - touches[1]._point.y, 2));
                }
                return true;
            },
            
            onTouchesMoved: function(touches, event) {
                if (touches.length > 1)
                {
                    self.distanceEnd = Math.sqrt(Math.pow(touches[0]._point.x - touches[1]._point.x, 2) + Math.pow(touches[0]._point.y - touches[1]._point.y, 2));
                    if (self.distanceBegin != 0)
                    {
                        var targetZoom = self.gameCamera.zoomRatio + ((self.distanceEnd-self.distanceBegin) * Define.Camera.Zoom.Speed);
                        if (targetZoom > Define.Camera.Zoom.Min && targetZoom < Define.Camera.Zoom.Max)
                            self.gameCamera.zoomRatio = targetZoom;
                    }
                    self.distanceBegin = self.distanceEnd;
                }
                else
                {
                    var previous = self.gameCamera.node.position;
                    var delta = touches[0].getDelta();
                    var nextTargetX = previous.x - delta.x * Define.Camera.Move.Speed;
                    var nextTargetY = previous.y - delta.y * Define.Camera.Move.Speed;

                    var nextX = Math.min(Math.max(Define.Screen.Min_X, nextTargetX), Define.Screen.Max_X);
                    var nextY = Math.min(Math.max(Define.Screen.Min_Y, nextTargetY), Define.Screen.Max_Y);

                    self.gameCamera.node.setPosition(nextX, nextY);
                }

                return true;
            },
            onTouchesEnded: function(touches, event){
                self.distanceBegin = 0;
                self.distanceEnd = 0;
                let touchPos = touches[0].getLocation();
                let newParticle = ObjectSpawner.Spawn("firetouch", (obj) => {
                    ///*
                    obj.getComponent(cc.ParticleSystem).onDestroy = () => {
                        console.log("on Destroy particle ");
                        //ObjectSpawner.Return("firetouch", newParticle);
                    }
                    //*/
                   obj.setPosition(touchPos.x, touchPos.y);
                   obj.parent = self.node;

                });

                var object = ObjectSpawner.Spawn("house_1", (obj) => {
                    obj.setPosition(touchPos.x, touchPos.y);
                    obj.parent = self.node;
                });


                return true;
            },
        }, self.node);
    },

    InitMap(data)
    {
        Object.keys(data).forEach(function(building){
            if (ObjectSpawner.IsContain(building))
            {
                var obj = ObjectSpawner.Spawn(building);
                obj.parent = this.node;
            }
            else
            {
                console.log("Error: can't find building " + building);
            }
        }.bind(this));
    }
    
});
