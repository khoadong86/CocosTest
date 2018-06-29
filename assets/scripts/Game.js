const Buildings = require("Buildings");
var UIManager = require("UIManager");
var Game = cc.Class({

    extends: cc.Component,

    properties: {
        gameCamera: cc.Camera,
        ClickedParticle: cc.Prefab, 
        InitNode: cc.Node,
    },

    statics:
    {
        instance: null
    },

    onLoad () {

        Game.instance = this;

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
        this.Map = new cc.Node();
        this.Map.addComponent("Map");
        this.Map.getComponent("Map").InitMap(Buildings);
        this.Map.parent = this.node;
        this.Map.setSiblingIndex(0);
        this.InitInput();
        this.InitPhysic();
        this.InitManager();
    },

    InitInput()
    {

        var self = this;
        self.distanceBegin = 0;
        self.distanceEnd = 0;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            swallowTouches: true,

            onTouchesBegan: function(touches, event) {
                if (touches.length > 1)
                {
                    self.distanceBegin = Math.sqrt(Math.pow(touches[0]._point.x - touches[1]._point.x, 2) + Math.pow(touches[0]._point.y - touches[1]._point.y, 2));
                }
                UIManager.instance.HideMenu("ProductBuilding");
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
            }
        }, self.node);
    },

    
    InitPhysic()
    {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enableDebugDraw = true;
    },

    InitManager()
    {
        cc.eventManager.setEnabled(true);
    }
});
