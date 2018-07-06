var UIManager = require("UIManager");

var QuestMgr = cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        QuestMgr.instance = this;
        this.Quests = LocalDB["Quests"];
        this.CurrentQuest = -1;
    },
    
    statics:
    {
        instance: null
    },

    getCurrentQuest()
    {
        return this.Quests[this.CurrentQuest];
    },

    getQuestById(Id)
    {
        return this.Quests[Id];
    },

    onQuestChange(change)
    {
        if(change.value && change.value != -1) {
            let questID = parseInt(change.value);
            if (this.CurrentQuest != -1 && this.CurrentQuest != questID) {
                UIManager.instance.ShowQuestComplete(this.CurrentQuest);
            }
            if(this.onNewQuestAvailable)
                this.onNewQuestAvailable();
            this.CurrentQuest = questID;
        } else {
            if(this.CurrentQuest != -1) {
                UIManager.instance.ShowQuestComplete(this.CurrentQuest);
            }
            if(this.onFinishedAllQuests)
                this.onFinishedAllQuests();
            this.CurrentQuest = -1;
        }
    }
});
