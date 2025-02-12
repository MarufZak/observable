import type { TKey, TObserver, TSubject, TValue } from "../types";

export const createSetTrap = (observer: TObserver) => {
    return (target: TSubject, key: TKey, value: TValue) => {
        const oldValue = target[key];
        target[key] = value;
        observer({ type: "set", key, oldValue, newValue: value });
        return true;
    };
};
