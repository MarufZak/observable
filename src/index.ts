import type { TObserver, TSubject } from "./types.js";

export function createObservable(subject: TSubject, observer: TObserver) {
    return new Proxy(subject, {
        get(target, key: string, value) {
            observer({ type: "get", key, value });
            return target[key as string];
        },
        set(target, key: string, value) {
            const oldValue = target[key];
            target[key] = value;
            observer({ type: "set", key, oldValue, newValue: value });
            return true;
        },
        deleteProperty(target, key: string) {
            let returnValue = false;
            if (key in target) {
                observer({ type: "delete", key, value: target[key] });
                delete target[key];
                returnValue = true;
            } else {
                observer({ type: "delete", key, value: target[key] });
                returnValue = false;
            }

            return returnValue;
        },
    });
}
