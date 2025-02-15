import type { TKey, TObserver, TSubject } from "../types";

export const createDeletePropertyTrap = (observer: TObserver) => {
    return (target: TSubject, key: TKey) => {
        if (key in target) {
            observer({ type: "delete", key, value: target[key] });
            delete target[key];
            return true;
        } else {
            observer({ type: "delete", key, value: target[key] });
            return false;
        }
    };
};
