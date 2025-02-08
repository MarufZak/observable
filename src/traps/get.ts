import type { TKey, TObserver, TSubject, TValue } from "../types.js";

export const createGetTrap = (observer: TObserver) => {
    return (target: TSubject, key: TKey, value: TValue) => {
        observer({ type: "get", key, value });
        return target[key as string];
    };
};
