import { getTraps } from "./traps/index.js";
import type { TObserver, TSubject } from "./types.js";

export function createObservable(subject: TSubject, observer: TObserver) {
    const { get } = getTraps(observer);

    return new Proxy(subject, {
        get,
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
