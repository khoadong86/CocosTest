var QuestMgr = require("QuestMgr");

cc.Class({
    extends: cc.Component,

    properties: {      
        Rewards: cc.Node,
    },

    statics:
    {
        instance: null
    },

    showPopup(QuestID)
    {
        this.QuestData = QuestMgr.instance.getQuestById(QuestID);
        let rewardItems = this.Rewards.children;
        for (let i=0; i<3; i++)
        {
            if (this.QuestData["Reward_" + (i+1)])
            {
                let rewardData = this.QuestData["Reward_" + (i+1)].split(",");
                let quantity = rewardData[0];
                let name = rewardData[1];

                rewardItems[i].getComponent("UI_QuestRewardItem").setDisplay(name, quantity);
            }
            else
            {
                rewardItems[i].active = false;
            }
        }
    },

    closePopup()
    {
        this.node.active = false;
    }
});
