var Game = require("Game");

class InputMgr
{
    constructor()
    {
        this.gameCamera = null;
        this.distanceBegin = 0;
        this.distanceEnd = 0;
        this.dragObject = null;
    }

    onTouchesBegan(touches, event)
    {
        return true;
    }

    setCamera(camera)
    {
        this.gameCamera = camera;
    }

    addDragObject(obj)
    {
        this.dragObject = obj;
    }

    removeDragObject()
    {
        this.dragObject = null;
    }

    onTouchesMoved(touches, event)
    {
        let self = this;

        if (touches.length >1)
        {

        }
        else
        {
            /*if (this.dragObject != null)
            {
                this.dragObject.position = touches[0]._point;
            }*/
            var previous = self.gameCamera.node.position;
            var delta = touches[0].getDelta();
            var nextTargetX = previous.x - delta.x * Define.Camera.Move.Speed;
            var nextTargetY = previous.y - delta.y * Define.Camera.Move.Speed;

            var nextX = Math.min(Math.max(Define.Screen.Min_X, nextTargetX), Define.Screen.Max_X);
            var nextY = Math.min(Math.max(Define.Screen.Min_Y, nextTargetY), Define.Screen.Max_Y);

            self.gameCamera.node.setPosition(nextX, nextY);

        }
        return true;
    }

    onTouchesEnded(touches, event)
    {
        if (this.dragObject != null)
            this.removeDragObject()
            
        return true;
    }
}

module.exports = new InputMgr();
