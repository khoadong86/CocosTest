cc.Class({
    extends: cc.Component,

    onLoad ()
    {
        this.drawing = this.node.addComponent(cc.Graphics);
        this.DrawDebug();
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
    },

    DrawDebug()
    {
        this.drawing.lineWidth = 1;
        this.drawing.strokeColor = cc.Color.RED;

        for (var i=0; i<=Define.IsometricField.Size.row; i++)
        {
            var startX = Define.IsometricField.StartPos.x - i*(Define.IsometricField.Tiled.width/2);
            var startY = Define.IsometricField.StartPos.y - i*(Define.IsometricField.Tiled.height/2);
            var endX = startX + Define.IsometricField.Size.column * (Define.IsometricField.Tiled.width/2);
            var endY = startY - Define.IsometricField.Size.row * (Define.IsometricField.Tiled.height/2);
            this.drawing.moveTo(startX, startY);
            this.drawing.lineTo(endX, endY);
            this.drawing.stroke();
        }

        for (var i=0; i<=Define.IsometricField.Size.column; i++)
        {
            var startX = Define.IsometricField.StartPos.x + i*(Define.IsometricField.Tiled.width/2);
            var startY = Define.IsometricField.StartPos.y - i*(Define.IsometricField.Tiled.height/2);
            var endX = startX - Define.IsometricField.Size.column * (Define.IsometricField.Tiled.width/2);
            var endY = startY - Define.IsometricField.Size.row * (Define.IsometricField.Tiled.height/2);
            this.drawing.moveTo(startX, startY);
            this.drawing.lineTo(endX, endY);
            this.drawing.stroke();
        }
    }
});