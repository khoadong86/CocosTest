 
var IconHandle = require("IconHandle");

cc.Class({
    extends: IconHandle,

    properties: {
        Number:{default:null, type: cc.Label},
    },

    onLoad () {
        this._super();
    },

    start () {
    },

    init(id, number) {
        this.id = id;
        this.number = number;
        this.setNumberLabel(number);
    },

    setNumberLabel(num) {
        this.Number.node.color = new cc.Color(0, 0, 0);
        if (num == 0) {
            this.Number.node.color = new cc.Color(255, 0, 0);
        }
        this.Number.string = "" + num;
    },

    getNumber() {
        return this.number;
    },

    dropDown() {
        this.number--;
        this.setNumberLabel(this.number);
    },

    onCollisionEnter: function (other, self) {
        console.log ('Collision on group : ' + self.node.group + " other group: " + other.node.group);
        if (other.node.group == "Field" && self.getComponent("IconHandle").isPickup()) {
            let cropIconHandle = self.getComponent("CropIconHandle");
            if (cropIconHandle.getNumber() > 0 && other.node.getComponent("CropField").plantCrop(this.id) ) {
                self.getComponent("CropIconHandle").dropDown();
            }
        }
    }

    // update (dt) {},
});
