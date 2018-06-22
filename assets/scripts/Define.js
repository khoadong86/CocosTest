var Define = {
    ObjectsPool:{
        "house_1":
        {
            "prefabs":"prefabs/house_1",
            "quantity": 1
        },
        "house_2":
        {
            "prefabs":"prefabs/house_2",
            "quantity": 1
        },
        "house_3":
        {
            "prefabs":"prefabs/house_3",
            "quantity": 1
        },
        "firetouch":
        {
            "prefabs":"prefabs/firetouch",
            "quantity": 10
        }
    },
    Screen:
    {
        Min_X: -600,
        Min_Y: -700,
        Max_X: 1900,
        Max_Y: 1500,
    },
    Camera:{
        Zoom:
        {
            Speed: 0.001,
            Max: 1.6,
            Min: 0.5
        },
        Move:
        {
            Speed: 1.5
        }
    }
}

module.exports = Define;