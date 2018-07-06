var UIManager = require("UIManager");
var QuestMgr = require("QuestMgr");

window.OnlineMgr = cc.Class({
    extends: cc.Component,

    properties: {
    },

    statics: {
        instance: null,
    },

    onLoad: function () {
        this._id = null;
        this._roomId = null;
        this._players = {};
        this._controlled = null;
        this._client = null;
        this._room = null;
        OnlineMgr.instance = this;
        this.farmProfile = this.getComponent("FarmProfile");
    },

    start: function () {
        this.connect();
    },

    connect: function () {
        console.log('Connect');

        var playerId = "TestPlayerID";
        var contextId = "testROOM02";
        if(FBInstantHelper.isReady()) {
            playerId = FBInstantHelper.player.getID();
            contextId = FBInstantHelper.context.getID();
        }

        var roomContext = null;
        if (contextId) {
            roomContext = `context:${contextId}`;
        } else {
            roomContext = `solo:${playerId}`;
        }

        var wsHost = 'wss:colyseus-gameserver.herokuapp.com';
        // var wsHost = 'ws://sa2wks0525:2567';
        // var wsHost = 'ws://localhost:2567';

        var client = new Colyseus.Client(wsHost);
        var room = client.join("game", {
            playerId: playerId,
            roomContext: roomContext
        });

        room.listen("players/:id", this.farmProfile.onPlayerChange.bind(this.farmProfile));
        room.listen("players/:id/:energy", this.farmProfile.onPlayerEnergyChange.bind(this.farmProfile));
        
        room.listen("inventory/:attribute", this.farmProfile.onInventoryChange.bind(this.farmProfile));
        room.listen("tasks/:attribute", this.farmProfile.onTasksChange.bind(this.farmProfile));
        room.listen("quest", QuestMgr.instance.onQuestChange.bind(QuestMgr.instance));

        room.onMessage.add((response)=>{
            cc.log(response);
            if(response.type == 'error') {
                UIManager.instance.showNotification(response.message);
                this.farmProfile.onErrorTask(response.action);
            }
            else if(response.type == 'energy') {

            }
        })
        this.farmProfile._id = playerId;
        this._roomId = room.id;
        this._client = client;
        this._room = room;
    },

    send(data) {
        cc.log("send Data to server", data);
    	this._room && this._room.send(data);
    },
});
