var FBInstantHelper = cc.Class({
    ctor () {
        this.player = null;
        this.context = null;
        this.contextPlayers = {};
    },

    init (callback) {
        var thiz = this;

        if (typeof FBInstant === 'undefined') {
            if(callback)
                callback(false);
            return;
        }

        this.player = FBInstant.player;

        this.context = FBInstant.context;

        if(this.context.getID() == null){
            if(callback)
                callback(true);
                return;
        }

        FBInstant.context.getPlayersAsync()
        .then(function(players) {
            cc.log("Get players completed", players);
            players.forEach(function(player) {
                thiz.contextPlayers[player.getID()] = player;
                ImageCached.Add(player.getID(), player.getPhoto());
            });
            if(callback)
                callback(true);
        });
    },
    isReady () {
        return typeof FBInstant !== 'undefined';
    },
    getContextPlayer (playerId) {
        if(this.player && playerId == this.player.getID()) {
            return this.player;
        }
        return this.contextPlayers[playerId] || {getID(){return playerId;}, getName(){return playerId;}, getPhoto(){ return "https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&oh=f82825558ea2782cb27963ac46bc0bad&oe=5BD93E2F";}};
    },

    onQuitGame () {
        if (typeof FBInstant === 'undefined') return;
        FBInstant.quit();
    },

    onShareGame () {
        if (typeof FBInstant === 'undefined') return;
        FBInstant.shareAsync({
            intent: 'SHARE',
            image: this.getImgBase64(),
            text: 'X is asking for your help!',
            data: {myReplayData: '...'},
        }).then(() => {
            // continue with the game.
        });
    },

    getImgBase64 () {
        let target = cc.find('Canvas');
        let width = 960, height = 640;
        let renderTexture = new cc.RenderTexture(width, height);
        renderTexture.begin();
        target._sgNode.visit();
        renderTexture.end();
        //
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            let texture = renderTexture.getSprite().getTexture();
            let image = texture.getHtmlElementObj();
            ctx.drawImage(image, 0, 0);
        }
        else if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
            let buffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
            let texture = renderTexture.getSprite().getTexture()._glID;
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            let data = new Uint8Array(width * height * 4);
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            let rowBytes = width * 4;
            for (let row = 0; row < height; row++) {
                let srow = height - 1 - row;
                let data2 = new Uint8ClampedArray(data.buffer, srow * width * 4, rowBytes);
                let imageData = new ImageData(data2, width, 1);
                ctx.putImageData(imageData, 0, row);
            }
        }
        return canvas.toDataURL('image/png');
    }
});

module.exports = new FBInstantHelper();