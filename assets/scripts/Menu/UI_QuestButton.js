var UIManager = require("UIManager");
var QuestMgr = require("QuestMgr");

cc.Class({
    extends: cc.Component,

    properties: {
        QuestContainer: cc.Node,
        QuestDescription: cc.Label,
        Requirements: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    start () {
        this.questButton = this.getComponent(cc.Button);
        this.questButton.interactable = false;
        QuestMgr.instance.onNewQuestAvailable = this.onNewQuestAvailable.bind(this);
        QuestMgr.instance.onFinishedAllQuests = this.onFinishedAllQuests.bind(this);
        this.InitQuests();
    },

    InitQuests()
    {
        this.QuestContainer.active = false;       
    },

    onNewQuestAvailable(){
        this.questButton.interactable = true;
    },

    onFinishedAllQuests(){
        this.questButton.interactable = false;
    },

    onQuestButtonClick()
    {
        this.QuestData = QuestMgr.instance.getCurrentQuest();
        this.QuestContainer.active = !this.QuestContainer.active;
        this.QuestDescription.string = this.QuestData.Quest;
        let requirements = this.QuestData.Counters.split(",");
        let quantity = this.QuestData.Quantity.toString().split(",");

        if (requirements.length != quantity.length)
        {
            console.log("missing requirements")
        }
        else
        {
            let ReqList = this.Requirements.children;
            for (let i=0; i<3; i++)
            {
                if (i<requirements.length)
                {
                    ReqList[i].active = true;
                    ReqList[i].getComponent("UI_RequireItem").setDisplay(requirements[i], quantity[i]);
                }
                else
                {
                    ReqList[i].active = false;
                }
            }
        }
    }
});
