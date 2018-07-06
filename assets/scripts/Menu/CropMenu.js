
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad ()
    {
        this.node.on("touchstart", function(event){

        }),

        this.node.on("touchmove", function(event){
            let currentPos = this.node.position;
            this.node.setPosition(currentPos.x + event.getDelta().x, currentPos.y + event.getDelta().y)
            return true;
        }.bind(this));

        this.node.on("touchend", function(event){
            console.log("touchend");
        })
    }
});
