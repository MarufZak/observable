var createObservable = function (subject, observer) {
    return new Proxy(subject, {
        get: function (target, key, value) {
            observer("get", key, value, value);
            return target[key];
        },
    });
};
var target = { ok: "ok" };
var observable = createObservable(target, function () { });
var t = observable.ok;
console.log({ t: t });
