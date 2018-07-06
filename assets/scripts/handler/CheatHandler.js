var OnlineMgr = require("OnlineMgr");

cc.Class({
    extends: cc.Component,
    onCheatEnergy(){
        OnlineMgr.instance.send(['cheat_energy']);
    },
    onResetFarm(){
        OnlineMgr.instance.send(['cheat_reset_farm']);
    }
});
