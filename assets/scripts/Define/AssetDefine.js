module.exports =
{
  "buildings": {
    "1000": {
      "id": 1000,
      "id_string": "Farm_HQ",
      "name": "Farm House",
      "max_level": 1
    },
    "1001": {
      "id": 1001,
      "id_string": "Farm_Storage_Barn",
      "name": "Barn",
      "max_level": 1
    },
    "1002": {
      "id": 1002,
      "id_string": "PB_Soil_Plot",
      "name": "Crop Land",
      "max_level": 1
    },
    "1003": {
      "id": 1003,
      "id_string": "PB_Mill",
      "name": "Mill",
      "max_level": 3
    },
    "1004": {
      "id": 1004,
      "id_string": "PB_Bread_Oven",
      "name": "Oven",
      "max_level": 3
    }
  },
  "items": {
    "2000": {
      "id": 2000,
      "id_string": "coin",
      "name": "Coin",
      "UI_Frame": "UI_Icon_Coin"
    },
    "2001": {
      "id": 2001,
      "id_string": "Ing_Wheat_Crop",
      "name": "Wheat",
      "UI_Frame": "UI_Icon_Crop_Wheat"
    },
    "2002": {
      "id": 2002,
      "id_string": "Ing_Sugar_Cane_Crop",
      "name": "Sugarcane",
      "UI_Frame": "UI_Icon_Crop_SugarCane"
    },
    "2003": {
      "id": 2003,
      "id_string": "Ing_Flour",
      "name": "Flour",
      "UI_Frame": "UI_Icon_Ing_Flour"
    },
    "2004": {
      "id": 2004,
      "id_string": "Ing_Brown_Sugar",
      "name": "Brown sugar",
      "UI_Frame": "UI_Icon_Ing_Brown_Sugar"
    },
    "2005": {
      "id": 2005,
      "id_string": "Ing_Bread",
      "name": "Bread",
      "UI_Frame": "UI_Icon_Ing_Bread"
    },
    "2006": {
      "id": 2006,
      "id_string": "Rec_Muffin",
      "name": "Muffin",
      "UI_Frame": "UI_Icon_Rec_Muffin"
    }
  },
  "tasks": {
    "3000": {
      "id": 3000,
      "id_string": "plant_wheat",
      "action": "produce",
      "building": "PB_Soil_Plot",
      "building_level": 1,
      "product": "Ing_Wheat_Crop",
      "energy": 1,
      "input": {
        "Ing_Wheat_Crop": 1
      },
      "amount": 2,
      "duration": 30,
      // "energy_to_collect": 1,
      "energy_to_speedup": 1,
      "speedup_amount": 30
    },
    "3001": {
      "id": 3001,
      "id_string": "plant_sugarcane",
      "action": "produce",
      "building": "PB_Soil_Plot",
      "building_level": 1,
      "product": "Ing_Sugar_Cane_Crop",
      "energy": 2,
      "input": {
        "Ing_Sugar_Cane_Crop": 1
      },
      "amount": 2,
      "duration": 60,
      // "energy_to_collect": 2,
      "energy_to_speedup": 3,
      "speedup_amount": 60
    },
    "3002": {
      "id": 3002,
      "id_string": "produce_flour",
      "action": "produce",
      "building": "PB_Mill",
      "building_level": 1,
      "product": "Ing_Flour",
      "energy": 2,
      "input": {
        "Ing_Wheat_Crop": 3
      },
      "amount": 1,
      "duration": 120,
      "energy_to_speedup": 5,
      "speedup_amount": 60
    },
    "3003": {
      "id": 3003,
      "id_string": "produce_brown_sugar",
      "action": "produce",
      "building": "PB_Mill",
      "building_level": 1,
      "product": "Ing_Brown_Sugar",
      "energy": 2,
      "input": {
        "Ing_Sugar_Cane_Crop": 1
      },
      "amount": 1,
      "duration": 120,
      "energy_to_speedup": 5,
      "speedup_amount": 60
    },
    "3004": {
      "id": 3004,
      "id_string": "produce_bread",
      "action": "produce",
      "building": "PB_Bread_Oven",
      "building_level": 1,
      "product": "Ing_Bread",
      "energy": 1,
      "input": {
        "Ing_Wheat_Crop": 2
      },
      "amount": 1,
      "duration": 90,
      "energy_to_speedup": 3,
      "speedup_amount": 60
    },
    "3005": {
      "id": 3005,
      "id_string": "produce_muffin",
      "action": "produce",
      "building": "PB_Bread_Oven",
      "building_level": 1,
      "product": "Rec_Muffin",
      "energy": 4,
      "input": {
        "Ing_Flour": 2,
        "Ing_Brown_Sugar": 2
      },
      "amount": 1,
      "duration": 240,
      "energy_to_speedup": 8,
      "speedup_amount": 60
    },
    "3006": {
      "id": 3006,
      "id_string": "unlock_mill",
      "action": "unlock",
      "building": "PB_Mill",
      "energy": 2,
      "input": {
        "coin": 50
      },
      "duration": 90,
      "energy_to_speedup": 5,
      "speedup_amount": 60
    },
    "3007": {
      "id": 3007,
      "id_string": "unlock_oven",
      "action": "unlock",
      "building": "PB_Bread_Oven",
      "energy": 2,
      "input": {
        "coin": 50
      },
      "duration": 60,
      "energy_to_speedup": 5,
      "speedup_amount": 60
    },
    "3008": {
      "id": 3008,
      "id_string": "upgrade_oven_lv2",
      "action": "upgrade",
      "building": "PB_Bread_Oven",
      "building_level": 1,
      "energy": 2,
      "input": {
        "coin": 100
      },
      "duration": 60,
      "energy_to_speedup": 5,
      "speedup_amount": 60
    },
    "3009": {
      "id": 3009,
      "id_string": "upgrade_oven_lv3",
      "action": "upgrade",
      "building": "PB_Bread_Oven",
      "building_level": 2,
      "energy": 4,
      "input": {
        "coin": 200
      },
      "duration": 120,
      "energy_to_speedup": 8,
      "speedup_amount": 60
    },
    "3010": {
      "id": 3010,
      "id_string": "upgrade_mill_lv2",
      "action": "upgrade",
      "building": "PB_Mill",
      "building_level": 1,
      "energy": 2,
      "input": {
        "coin": 100
      },
      "duration": 60,
      "energy_to_speedup": 5,
      "speedup_amount": 60
    },
    "3011": {
      "id": 3011,
      "id_string": "upgrade_mill_lv3",
      "action": "upgrade",
      "building": "PB_Mill",
      "building_level": 2,
      "energy": 4,
      "input": {
        "coin": 200
      },
      "duration": 120,
      "energy_to_speedup": 8,
      "speedup_amount": 60
    }
  }
};