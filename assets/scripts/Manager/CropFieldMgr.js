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
        FieldPrefab: { default: null, type: cc.Prefab },
        dummyField: { default: [], type: cc.Node },
        TestFieldNumber: { default: 8 },
    },

    // onLoad () {},
    init() {
        this.offsetDirectionR = new cc.Vec2(
            this.dummyField[1].position.x - this.dummyField[0].position.x,
            this.dummyField[1].position.y - this.dummyField[0].position.y
        );
        this.offsetDirectionD = new cc.Vec2(
            this.dummyField[2].position.x - this.dummyField[0].position.x,
            this.dummyField[2].position.y - this.dummyField[0].position.y
        );
        this.initPos = new cc.Vec2(this.dummyField[0].position.x, this.dummyField[0].position.y );

    },
    start() {
        this.init();
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
    },

    // update (dt) {},
});
