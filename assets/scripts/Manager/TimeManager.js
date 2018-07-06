
class TimeManager{
    getNowTimeStamp() {
        return new Date().getTime();
    }
}

module.exports = new TimeManager();