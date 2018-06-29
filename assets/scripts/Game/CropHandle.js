var CROP_STATE = cc.Enum({
    INIT: 0,
    GROWING: 1,
    FINISHED: 2,
});

var HarvestIconMgr = require("HarvestIconMgr");
cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: { default: null, type: cc.ProgressBar },
        timeLabel: { default: null, type: cc.Label },
        display: {default: null, type: cc.Node},
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.sprite = this.getComponent(cc.Sprite);
        this.node.on(cc.Node.EventType.TOUCH_END, this.dragEnd, this);
        this.progressBar.node.active = false;
        this.isShowProgressBar = false;
        this.totalState = CROP_STATE.FINISHED;
        this.cropDisplayNode = null;
    },

    dragEnd(event) {
        if (this.state == CROP_STATE.FINISHED) {
            this.isShowProgressBar = false;
            this.progressBar.node.active = this.isShowProgressBar;
            HarvestIconMgr.instance.showAtPosition(this.node.parent.convertToWorldSpace(this.node.position));
        }
        else 
        {
            this.isShowProgressBar = !this.isShowProgressBar;
            this.progressBar.node.active = this.isShowProgressBar;
        }
    },

    start() {

    },

    setFieldPlantOn(field) {
        this.field = field;
    },

    setCropSprite(cropFrames, state = GameDefine.CROP_STATE.INIT) {
        this.frames = cropFrames;
        this.sprite.spriteFrame = this.frames[this.state];
        this.state = state;
    },

    setCropDisplay(id, state = GameDefine.CROP_STATE.INIT) {
        cc.loader.loadRes(Define.CropsPrefabPath + id, cc.Prefab, (err, item) => {
            let newItem = cc.instantiate(item);
            newItem.parent = this.display;
            this.displayHandle = newItem.getComponent("CropDisplayHandle");
       });
       this.state = state;
    },

    setCropParam(duration) {
        this.duration = duration;
        this.timer = this.duration;
    },

    collect() {
        if (this.state == CROP_STATE.FINISHED) {
            this.field.harvest();
            this.node.destroy();
        }
    },

    update(dt) {
        this.timer -= dt;
        if (this.timer <= 0)
            this.timer = 0;
        this.timeLabel.string = Math.round(this.timer);
        this.progressBar.progress = 1.0 - (this.timer / this.duration);
        if (this.duration - this.timer >= this.duration) {
            this.state = CROP_STATE.FINISHED;
            this.isShowProgressBar = false;
            this.progressBar.node.active = this.isShowProgressBar;
            this.displayHandle.setState(this.state);
        } else 
        if (this.duration - this.timer >= this.duration * CROP_STATE.GROWING / this.totalState) {
            this.state = CROP_STATE.GROWING;
            this.displayHandle.setState(this.state);
        }
    },
});
