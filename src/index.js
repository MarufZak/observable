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
    });
};
