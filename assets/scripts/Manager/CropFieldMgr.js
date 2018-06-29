cc.Class({
    extends: cc.Component,

    properties: {
        FieldPrefab: { default: null, type: cc.Prefab },
        dummyField: { default: [], type: cc.Node },
        TestFieldNumber: { default: 8 },
    },

    // onLoad () {},
    init() {
        /*
        this.offsetDirectionR = new cc.Vec2(
            this.dummyField[1].position.x - this.dummyField[0].position.x,
            this.dummyField[1].position.y - this.dummyField[0].position.y
        );
        this.offsetDirectionD = new cc.Vec2(
            this.dummyField[2].position.x - this.dummyField[0].position.x,
            this.dummyField[2].position.y - this.dummyField[0].position.y
        );
        //this.initPos = new cc.Vec2(this.dummyField[0].position.x, this.dummyField[0].position.y );
        this.initPos = this.node.parent.convertToWorldSpace(this.node.position);//this.node.getPosition();//this.node.parent.convertToWorldSpace(this.node.position);
        */
    },
    onLoad() {
        this.init();
        /*
        let SquareNum = 0;
        while (SquareNum * SquareNum < this.TestFieldNumber)
            SquareNum++;
        let count = 0;
        for (let i = 0; i < SquareNum; i++) {
            for (let j = 0; j < SquareNum; j++) {
                const newField = cc.instantiate(this.FieldPrefab);
                let newPos = new cc.Vec2();
                newPos = this.initPos.add(this.offsetDirectionR.mul(i)).add(this.offsetDirectionD.mul(j));
                newField.setPosition(newPos.x, newPos.y);
                newField.parent = this.node;
                count++;
                if (count >= this.TestFieldNumber) break;
            }
            if (count >= this.TestFieldNumber) break;
        }
        */
        this.atlasPack = cc.loader.loadRes("spritesheet/UI_Icon_Crop", cc.SpriteAtlas);
    },

    // update (dt) {},
});
