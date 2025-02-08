import type { TKey, TObserver, TSubject, TValue } from "../types.js";

export const createGetTrap = (observer: TObserver) => {
    return (target: TSubject, key: TKey) => {
        observer({ type: "get", key, value: target[key] });
        return target[key];
    };
};
