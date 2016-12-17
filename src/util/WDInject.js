import InjectionPool from './InjectionPool'
Object.prototype.Injectable = function () {
    return (target, property, descriptor) => {
        let injection = {
            'hashcode': target.prototype.hashcode,
            'type': target.prototype.type || target.prototype.constructor.name,
            'target': target,
            'property': property,
            'descriptor': descriptor
        }
        InjectionPool.add(injection)
    }
}

Object.prototype.Inject = function (...injections) {
    return (target, property, descriptor) => {
        injections.forEach(function (injection) {
            let obj = InjectionPool.get(injection)
            Object.defineProperty(target.prototype, obj.type, {
                __proto__: null,
                enumerable: true,
                get: function () {
                    var elem = new obj.target
                    return elem
                }
            })
        })
    }
}

Object.prototype.InjectLoader = function (...loaders) {
    return (target, property, descriptor) => {
        loaders.forEach(function (loader) {
            let obj = InjectionPool.get(loader)
            var loaderStart = new obj.target()
        })
        new target()
    }
}

export default {
    Injectable,
    Inject,
    InjectLoader
}