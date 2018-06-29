class MockupData {
    constructor() {

    }

    GetProfile() {
        return {
            level : 1, 
            xp : 200, 
            progressing : [
                "Crop1_corn_<Time>", 
                "Crop2_corn_<Time>",
            ],
        }
    }
}

module.exports = new MockupData();