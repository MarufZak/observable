import type { TKey, TObserver, TSubject } from "../types.js";

export const createDeletePropertyTrap = (observer: TObserver) => {
    return (target: TSubject, key: TKey) => {
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
    };
};
