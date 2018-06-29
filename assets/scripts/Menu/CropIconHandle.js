 
var IconHandle = require("IconHandle");

cc.Class({
    extends: IconHandle,

    properties: {
        propagate: {
            default: false
        },
    },

    onLoad () {
        this._super();
    },

    start () {
    },

    init(id) {
        this.id = id;
    },

    onCollisionEnter: function (other, self) {
        console.log ('Collision on group : ' + self.node.group + " other group: " + other.node.group);
        if (other.node.group == "Field" && self.getComponent("IconHandle").isPickup()) {
            other.node.getComponent("CropField").checkPlantCrop(this.id);
        }
    }

    // update (dt) {},
});
