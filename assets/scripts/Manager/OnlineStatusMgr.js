let OnlineStatusMgr = cc.Class({
    extends: cc.Component,

    properties: {
        statusPrefab: cc.Prefab,
        online: cc.Texture2D
    },
    statics: {
        instance: null
    },
    //==========================
    onLoad() {
        this.players = {};
        OnlineStatusMgr.instance = this;
    },
    //==========================
    addPlayer(player) {
        let playerID = player.getID();
        if(!this.players[playerID]) {
            let name = player.getName();
            let playerStatus = cc.instantiate(this.statusPrefab).getComponent("PlayerStatus");
            playerStatus.init({name:name, texture:this.online});
            playerStatus.node.name = playerID;
            this.node.addChild(playerStatus.node);
            this.players[playerID] = playerStatus;
        }
    },
    removePlayer(player) {
        let playerID = player.getID();
        if(this.players[playerID]) {
            let nodeName = this.players[playerID].node.name;
            cc.find(nodeName, this.node).destroy();
            this.players[playerID] = null;
        }
    }
});
