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
        Product: cc.Label,
        Materials: cc.Node,
        CurrentAmount: cc.Node,
        ProduceTime: cc.Node,
    },

    setDisplay(name, materials, position)
    {
        console.log("aaaaaaaaa");
        this.Product.string = materials.Ingredient_name + " x " + materials.Output_amount;

        //set current amount text

        //set time text

        //set material
        this.Materials.children.forEach(element => {
            element.active = false;
        });

        let count = 0;
        for (let name in materials.requirements)
        {
            let amount = materials.requirements[name];
            if (count < this.Materials.children.length)
            {
                this.Materials.children[count].getComponent("UI_MaterialSlot").setDisplay(name, amount);
                count += 1;
            }
        }

        this.node.setPosition(position.x - this.node.getBoundingBox().width/2 - 50 , position.y);
        this.node.active = true;
    }
});
