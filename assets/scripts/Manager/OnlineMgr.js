var UIManager = require("UIManager");
var OnlineStatusMgr = require("OnlineStatusMgr");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        this._id = null;
        this._roomId = null;
        this._players = {};
        this._controlled = null;
        this._client = null;
        this._room = null;
    },

    start: function () {
        this.fbInstantHelper = this.getComponent("FBInstantHelper");
        this.fbInstantHelper.init();
        this.farmProfile = this.getComponent("FarmProfile");
        this.connect();
    },

    connect: function () {
        console.log('Connect');

        var playerId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        var contextId = "testROOM";
        if(this.fbInstantHelper.isReady()) {
            playerId = this.fbInstantHelper.player.getID();
            contextId = this.fbInstantHelper.context.getID();
        }

        var roomContext = null;
        if (contextId) {
            roomContext = `context:${contextId}`;
        } else {
            roomContext = `solo:${playerId}`;
        }

        var wsHost = 'wss:colyseus-gameserver.herokuapp.com';
        // var wsHost = 'ws://localhost:2567';

        var client = new Colyseus.Client(wsHost);
        var room = client.join("game", {
            playerId: playerId,
            roomContext: roomContext
        });

        room.listen("players/:id", this.onPlayerChange.bind(this));
        room.listen("farmProfile/:attribute", this.farmProfile.onFarmProfileChange.bind(this.farmProfile));

        this._id = playerId;
        this._roomId = room.id;
        this._client = client;
        this._room = room;
    },

    onPlayerChange: function (change) {
        console.log('Online status change.');
        console.log(change)
        var playerId = change.path.id;
        var player;

        if (playerId == this._id)
            return;

        if (change.operation === "add") {
            player = this.fbInstantHelper.getContextPlayer(playerId) || {getID(){return playerId;}, getName(){return playerId;}};
            if (player) {
                this._players[player.getID()] = player;
                UIManager.instance.showNotification("Player " + player.getName() + " is Online");
                cc.log("Player " + player.getName() + " is Online");
                OnlineStatusMgr.instance.addPlayer(player);
            }
        } else if (change.operation === "remove") {
            player = this._players[playerId];
            if (player) {
                delete this._players[playerId];
                UIManager.instance.showNotification("Player " + player.getName() + " is Offline");
                cc.log("Player " + player.getName() + " is Offline");
                OnlineStatusMgr.instance.removePlayer(player);
            }
        }
    },
});
