var UIManager = require("UIManager");
var OnlineStatusMgr = require("OnlineStatusMgr");
var NotificationIGMgr = require("NotificationIGMgr");
let FarmProfile = cc.Class({
    extends: cc.Component,
    properties: {
        energyChangedListeners: [cc.Component.EventHandler],
        softCurrencyChangedListeners: [cc.Component.EventHandler]
    },
    statics: {
        instance: null
    },
    onLoad() {
        FarmProfile.instance = this;

        this.profileData = {
            players: {},
            inventory: {},
            tasks: {}
        }
    },

    onPlayerChange(change) {
        console.log('Online status change.');
        console.log(change)
        var playerId = change.path.id;
        var player;

        if (playerId == this._id)
            UIManager.instance.HideLoadingScreen();

        if (change.operation === "add") {
            player = FBInstantHelper.getContextPlayer(playerId);
            if (player) {
                this.profileData.players[player.getID()] = player;
                UIManager.instance.showNotification("Player " + player.getName() + " is Online");
                OnlineStatusMgr.instance.addPlayer(player);
            }
        } else if (change.operation === "remove") {
            player = this.profileData.players[playerId];
            if (player) {
                delete this.profileData.players[playerId];
                this.profileData.players[playerId] = null;
                UIManager.instance.showNotification("Player " + player.getName() + " is Offline");
                OnlineStatusMgr.instance.removePlayer(player);
            }
        }
    },
    onPlayerEnergyChange(change) {
        cc.log("onPlayerEnergyChange", change);
        this.profileData.players[change.path.id].energy = change.value || 0;
        //Trigger energy change
        if (change.path.id == this._id)
            this.emitEnergyChanged(this.profileData.players[change.path.id].energy, 10); // TODO: Load max energy here / temporary used MAX_ENERGY = 10
    },
    onInventoryChange(change) {
        switch (change.operation) {
            case "remove":
                break;

            default: // update value
                this.profileData.inventory[change.path.attribute] = change.value;
                if (change.path.attribute == "coin") {
                    this.emitSoftCurrencyChanged(change.value);
                }
                break;
        }
        cc.log("onInventoryChange", this.profileData.inventory);
    },

    onTasksChange(change) {
        cc.log("onTasksChange", change);
        // add crop_wheat
        switch (change.operation) {
            case "add":
                const value = change.value;
                this.profileData.tasks[change.path.attribute] = value;
                let task = AssetHelper.GetTaskByString(value.id);
                if(value.player != this._id) {
                    let player = FBInstantHelper.getContextPlayer(value.player);
                    UIManager.instance.showNotification("Player " + player.getName() + " just produced " + task.product);
                }
                if (value.building == "PB_Soil_Plot") {
                    let nameID = value.building + "-" + value.slot;
                    const productID = task.product;
                    let cropFieldNode = cc.find(Define.GameNode + "/CropFields/" + nameID);
                    if (cropFieldNode) {
                        cropFieldNode.getComponent("CropField").syncCropPlanted(productID, value.start_date);
                        //if (value.player != this._id) 
                            NotificationIGMgr.instance.createNotificationIG(cropFieldNode, value.player);
                    }
                }
                else {
                    let building = cc.find(Define.GameNode + "/" + value.building).getComponent("Building");
                    building.produceProduct(task.product, value);
                }
                break;

            case "remove":
                // handle havest item from task
                let currentTask = this.profileData.tasks[change.path.attribute];
                if (currentTask.building == "PB_Soil_Plot") {
                    let nameID = currentTask.building + "-" + currentTask.slot;
                    let cropFieldNode = cc.find(Define.GameNode + "/CropFields/" + nameID);
                    if (cropFieldNode) {
                        cropFieldNode.getComponent("CropField").syncCropFieldCollected();
                        //if (currentTask.player != this._id) 
                            NotificationIGMgr.instance.createNotificationIG(cropFieldNode, currentTask.player);
                    }
                } else {
                    let building = cc.find(Define.GameNode + "/" + currentTask.building).getComponent("Building");
                    building.CollectCompleteItem(currentTask.slot);
                }
                if(currentTask.player != this._id) {
                    let player = FBInstantHelper.getContextPlayer(currentTask.player);
                    UIManager.instance.showNotification("Player " + player.getName() + " just collected " + task.product);
                }
                this.profileData.tasks[change.path.attribute] = null;
                break;

            default: // update
                break;
        }
    },

    onErrorTask(action) {
        let act = action[0];
        let building = action[1];
        let productID = action[2];
        let slot = action[3];
        if (building == "PB_Soil_Plot") {
            let nameID = building + "-" + slot;
            let cropFieldNode = cc.find(Define.GameNode + "/CropFields/" + nameID);
            cropFieldNode.getComponent("CropField").syncError();
            NotificationIGMgr.instance.createNotificationIG(cropFieldNode, "error");
        }
    },

    emitEnergyChanged(curentEnergy, maxEnergy) {
        for (let i in this.energyChangedListeners) {
            this.energyChangedListeners[i].emit([curentEnergy, maxEnergy]);
        }
    },
    emitSoftCurrencyChanged(ammount) {
        for (let i in this.softCurrencyChangedListeners) {
            this.softCurrencyChangedListeners[i].emit([ammount]);
        }
    },

    getItemQuantity(id) {
        if (this.profileData.inventory[id] != undefined)
            return this.profileData.inventory[id];
        else return 0;
    }
});
