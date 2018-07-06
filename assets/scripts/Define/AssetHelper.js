const AssetDefine = require('./AssetDefine');

module.exports = {
    GetAsset (id) {
        id = String(id);
        if (id[0] == '1') {
            return AssetDefine['buildings'][id];
        }
        else if (id[0] == '2') {
            return AssetDefine['items'][id];
        }
        else if (id[0] == '3') {
            return AssetDefine['tasks'][id];
        }
        return null;
    },

    /**
     * Query building by id_string
     * @param {String} stringId 
     */
    GetBuildingByString (stringId) {
        var buildings = AssetDefine['buildings'];
        for (var id in buildings) {
            if (buildings[id].id_string == stringId)
                return buildings[id];
        }
        return null;
    },

    /**
     * Query item by id_string
     * @param {String} stringId 
     */
    GetItemByString (stringId) {
        var items = AssetDefine['items'];
        for (var id in items) {
            if (items[id].id_string == stringId)
                return items[id];
        }
    },

    /**
     * Query task by id_string
     * @param {String} stringId 
     */
    GetTaskByString (stringId) {
        var tasks = AssetDefine['tasks'];
        for (var id in tasks) {
            if (tasks[id].id_string == stringId)
                return tasks[id];
        }
        return null;
    },

    /**
     * Query task
     * Ex:
     *   GetTaskByAction("produce", "PB_Mill", "Ing_Flour")
     *   GetTaskByAction("upgrade", "PB_Mill", null, 1)
     * @param {String} action 
     * @param {String} building 
     * @param {String} product 
     * @returns {Object | null} 
     */
    GetTaskByAction (action, building, product = null, level=1) {
        var tasks = AssetDefine['tasks'];
        var task, found = false;
        for (var id in tasks) {
            task = tasks[id];
            if (task.action == action
                && task.building == building
                && task.product == product
                && task.building_level <= level
            ) {
                found = true;
                break;
            }
        }
        
        return found? task : null;
    },

    /**
     * Query available production of abuilding
     * @param {String} building 
     * @param {Number} level 
     */
    GetAvailableProduction (building, level=1) {
        var tasks = AssetDefine['tasks'];
        var task, products = {};
        for (var id in tasks) {
            task = tasks[id];
            if (task.building == building
                && task.building_level <= level
            ) {
                products[id] = task;
            }
        }
    }
}