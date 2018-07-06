const Buildings = require("Buildings");
var Game = cc.Class({

    extends: cc.Component,
    properties: {
        // ClickedParticle: cc.Prefab
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
        this.InitPhysic();
    },
    InitPhysic()
    {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enableDebugDraw = true;
    }
});
