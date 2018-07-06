const HIDE = 0;
const SHOW = 1;
let OnlineStatusMgr = cc.Class({
    extends: cc.Component,

    properties: {
        statusPrefab: cc.Prefab,
        ContentNode: cc.Node
    },
    statics: {
        instance: null
    },
    //==========================
    onLoad() {
        this.players = {};
        this.animator = this.getComponent(cc.Animation);
        this.currentState = HIDE;
        OnlineStatusMgr.instance = this;
    },
    //==========================
    addPlayer(player) {
        let playerID = player.getID();
        if(!this.players[playerID]) {
            let name = player.getName();
            let playerStatus = cc.instantiate(this.statusPrefab).getComponent("PlayerStatus");
            playerStatus.init({name:name, photoUrl:player.getPhoto(), playerID: playerID});
            playerStatus.node.name = playerID;
            this.ContentNode.addChild(playerStatus.node);
            this.players[playerID] = playerStatus;
        }
    },
    removePlayer(player) {
        let playerID = player.getID();
        if(this.players[playerID]) {
            this.players[playerID].node.destroy();
            this.players[playerID] = null;
        }
    },
    onButtonPressed(){
        if(this.currentState === HIDE) {
            this.animator.play('show_right');
            this.currentState = SHOW;
        } else {
            this.animator.play('hide_right');
            this.currentState = HIDE;
        }
    }
});
