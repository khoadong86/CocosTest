
var PlayerProfile = cc.Class({
    extends: cc.Component,

    properties: {
    },

    statics: {
        instance: null,
    },

    onLoad () {
        PlayerProfile.instance = this;
    },

    start () {
        let mockupProfile = MockupData.getProfile();
        this.level = mockupProfile.level;
        this.xp = mockupProfile.xp;
        this.progresssing = mockupProfile.progresssing;
    },

    // update (dt) {},
});
