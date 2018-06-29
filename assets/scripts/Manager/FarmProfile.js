cc.Class({
    extends: cc.Component,
    properties:{
        profileChangedListeners:[cc.Component.EventHandler]
    },
    onFarmProfileChange(change) {
        cc.log("onFarmProfileChange", change);
        this.emitProfileChanged(change);
    },
    emitProfileChanged(change) {
        for(let i in this.profileChangedListeners) {
            this.profileChangedListeners[i].emit([change]);
        }
    }
});
