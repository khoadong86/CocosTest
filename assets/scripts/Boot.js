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
	// TODO: Should cached assets after loaded
        // cc.loader.loadResDir('bulk', function (err, assets) {
        //     if (err) {
        //         cc.error(err);
        //         return;
        //     }
        //     this.loadPrefabs();
        // }.bind(this));
        this.loadPrefabs();
    },
    
    loadPrefabs()
    {
        this.progressBar.progress = 0.5;
        // ObjectSpawner.InitPools(this.loadGameScene.bind(this)); // NOTE: Currently, Pool is not in used
        FBInstantHelper.init(this.loadGameScene.bind(this));
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
