var injections = {}
export default Object.prototype.InjectionPool = {
    add: function (injection) {
        injections[injection.type] = injection
    },
    list: function () {
        return injections
    },
    get: function(injection) {
        return injections[injection]
    }
}