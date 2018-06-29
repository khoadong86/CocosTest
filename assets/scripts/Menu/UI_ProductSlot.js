cc.Class({
    extends: cc.Component,

    properties: {
        display: {
            default: null,
            type: cc.Sprite
        },
        timer: cc.Label
    },

    start () {
        this.StartTime = 0;
        this.Production_time = 0;
    },

    setDisplay(data)
    {
        if (data.Status == "Free")
        {
            this.StartTime = 0;
            this.timer.node.active = false;
            this.display.node.active = false;
        }
        else if (data.Status == "Inprogress")
        {
            this.StartTime = data.StartTime;
            this.Production_time = data.Production_time;
            this.timer.node.active = true;
            cc.loader.loadRes("bulk/textures/" + data.ProductId, function(err, img) {

                this.spriteFrame = new cc.SpriteFrame(img);
                this.node.active = true;
                
            }.bind(this.display));
        }
    },

    update (dt) {
        if (this.StartTime > 0)
        {
            let current = new Date().getTime();
            let offset = current - this.StartTime;
            let duration = this.Production_time*1000 - offset;
            if (duration > 0)
                this.timer.string = this.msToTime(duration);
        }
    },

    msToTime(duration)
    {
        var milliseconds = parseInt((duration%1000)/100);
        var seconds = parseInt((duration/1000)%60);
        var minutes = parseInt((duration/(1000*60))%60);
        var hours = parseInt((duration/(1000*60*60))%24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }
});
