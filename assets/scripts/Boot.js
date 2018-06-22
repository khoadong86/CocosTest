// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
        progressBar: cc.ProgressBar
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.loadResources();
    },
    
    loadResources()
    {
        this.progressBar.progress = 0;
        cc.loader.loadResDir('bulk', function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            this.loadPrefabs();
        }.bind(this));
    },
    
    loadPrefabs()
    {
        this.progressBar.progress = 0.5;
        ObjectSpawner.InitPools(this.loadGameScene.bind(this));
    },
    
    loadGameScene()
    {
        this.progressBar.progress = 0.8;
        cc.director.preloadScene("Game", function () {
            
            this.onFinishedLoading();
            
        }.bind(this));
    },
    
    onFinishedLoading()
    {
        this.progressBar.progress = 1;
        LoadedResource = true;
        cc.director.loadScene("Game");
    },
});
