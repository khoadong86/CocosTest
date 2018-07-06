const DEFAULT_AVATAR = "https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&oh=f82825558ea2782cb27963ac46bc0bad&oe=5BD93E2F";
let ImageCached = cc.Class({
    ctor(){
        this.cachedImages = {};
    },
    Add(id, URL) {
        if(!this.cachedImages[id]) {
            this.cachedImages[id] = URL;
            cc.loader.load(URL, ((err, img)=>{
                if(err) {cc.error(err); return;}
                this.cachedImages[id] = img;
            }).bind(this));
        }
    },
    Get(id, URL) {
        if(!this.cachedImages[id])
            this.Add(id, URL || DEFAULT_AVATAR);
        return this.cachedImages[id];
    }
})

module.exports = new ImageCached();