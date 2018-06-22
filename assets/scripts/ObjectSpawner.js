class ObjectSpawner
{
    constructor()
    {
        this.pools = {};
        this.ObjectCount = 0;
    }

    InitPools(callback)
    {
        console.log("Init pool objects");

        this.onFinishCallback = callback;

        var keys = Object.keys(Define.ObjectsPool);

        keys.forEach(function(element){

            cc.loader.loadRes(Define.ObjectsPool[element].prefabs, cc.Prefab, function(err, prefab){
                if (err)
                {
                    console.log("Error while loading prefab");
                    return;
                }

                this.pools[prefab.name] = new cc.NodePool();
                for (let i=0; i<Define.ObjectsPool[prefab.name].quantity; i++)
                {
                    let obj = cc.instantiate(prefab);
                    this.pools[prefab.name].put(obj);
                }

                this.ObjectCount +=1;
                if (this.ObjectCount == keys.length)
                {
                    this.onFinishCallback();
                }

            }.bind(this));
        }.bind(this));
    }

    IsContain(objName)
    {
        return this.pools.hasOwnProperty(objName);
    }

    Spawn(objName, callback)
    {
        if (this.pools.hasOwnProperty(objName))
        {
            if (this.pools[objName].size() > 0)
            {
                const obj = this.pools[objName].get();
                callback && callback(obj);
                return obj;
            }
            else
            {
                cc.loader.loadRes(Define.ObjectsPool[objName].prefabs, cc.Prefab, function(err, prefab){
                    if (err)
                    {
                        console.log("Error while loading prefab");
                        return;
                    }
    
                    let obj = cc.instantiate(prefab);
                    callback(obj);
                })
                console.log("Out of pool " + objName)
            }
        }
        else
            console.log("Pool " + objName + " isn't exists");

        //return null;
    }

    Put(obj)
    {
        if (this.pools.hasOwnProperty(obj.name))
        {
            this.pools[obj.name].put(obj);
        }
        else
        {
            console.log("Can't find pool " + obj.name);
        }
    }
}

module.exports = new ObjectSpawner();