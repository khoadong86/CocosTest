cc.Class({
    extends: cc.Component,

    ctor () {
        this.player = null;
        this.context = null;
        this.contextPlayers = {};
    },

    init () {
        var thiz = this;

        if (typeof FBInstant === 'undefined') return;

        this.player = FBInstant.player;

        this.context = FBInstant.context;

        FBInstant.context.getPlayersAsync()
        .then(function(players) {
            players.forEach(function(player) {
                thiz.contextPlayers[player.getID()] = player;
            });
        });
    },
    isReady () {
        return typeof FBInstant !== 'undefined';
    },
    getContextPlayer (playerId) {
        return this.contextPlayers[playerId];
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
