var UIManager = require("UIManager");

cc.Class({
    extends: cc.Component,

    properties: {
        gameCamera:cc.Camera
    },

    start(){
        this.InitInput();
        Define.Camera.Zoom.ratio = this.gameCamera.zoomRatio;
    },
    //===============================
    InitInput()
    {
        this.distanceBegin = 0;
        this.distanceEnd = 0;
        this.node.on("touchstart", this.onTouchesBegan.bind(this));
        this.node.on("touchmove", this.onTouchesMoved.bind(this));
        this.node.on("touchend", this.onTouchesMoved.bind(this));
        this.node.on("mousewheel", this.onMouseWheel.bind(this));
    },
    
    onTouchesBegan: function(event) {
        let touches = event._touches;
        if (touches.length > 1)
        {
            this.distanceBegin = Math.sqrt(Math.pow(touches[0]._point.x - touches[1]._point.x, 2) + Math.pow(touches[0]._point.y - touches[1]._point.y, 2));
        }
        return true;
    },
    onTouchesMoved: function(event) {
        let touches = event._touches;
        if (touches.length > 1)
        {
            this.distanceEnd = Math.sqrt(Math.pow(touches[0]._point.x - touches[1]._point.x, 2) + Math.pow(touches[0]._point.y - touches[1]._point.y, 2));
            if (this.distanceBegin != 0)
            {
                var targetZoom = this.gameCamera.zoomRatio + ((this.distanceEnd-this.distanceBegin) * Define.Camera.Zoom.Speed);
                if (targetZoom > Define.Camera.Zoom.Min && targetZoom < Define.Camera.Zoom.Max) {
                    this.gameCamera.zoomRatio = targetZoom;
                    Define.Camera.Zoom.ratio = this.gameCamera.zoomRatio;
                }
            }
            this.distanceBegin = this.distanceEnd;
        }
        else
        {
            var previous = this.gameCamera.node.position;
            var delta = touches[0].getDelta();
            var nextTargetX = previous.x - delta.x * Define.Camera.Move.Speed/this.gameCamera.zoomRatio;
            var nextTargetY = previous.y - delta.y * Define.Camera.Move.Speed/this.gameCamera.zoomRatio;

            var nextX = Math.min(Math.max(Define.Screen.Min_X, nextTargetX), Define.Screen.Max_X);
            var nextY = Math.min(Math.max(Define.Screen.Min_Y, nextTargetY), Define.Screen.Max_Y);

            this.gameCamera.node.setPosition(nextX, nextY);
        }

        return true;
    },
    onTouchesEnded: function(){
        this.distanceBegin = 0;
        this.distanceEnd = 0;
    },

    onMouseWheel: function (event) {
        var targetZoom = this.gameCamera.zoomRatio + (event.getScrollY() * Define.Camera.Zoom.Speed);
        if (targetZoom > Define.Camera.Zoom.Min && targetZoom < Define.Camera.Zoom.Max) {
            this.gameCamera.zoomRatio = targetZoom;
            Define.Camera.Zoom.ratio = this.gameCamera.zoomRatio;
        }
    },
});
