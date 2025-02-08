var createObservable = function (subject, observer) {
    return new Proxy(subject, {
        get: function (target, key, value) {
            observer("get", key, value, value);
            return target[key];
        },
        set: function (target, key, value) {
            var oldValue = target[key];
            target[key] = value;
            observer("set", key, oldValue, value);
            return true;
        },
        deleteProperty: function (target, key) {
            var returnValue = false;
            if (key in target) {
                observer("delete", key, target[key], undefined);
                delete target[key];
                returnValue = true;
            }
            else {
                observer("delete", key, undefined, undefined);
                returnValue = false;
            }
            return returnValue;
        },
    });
};
