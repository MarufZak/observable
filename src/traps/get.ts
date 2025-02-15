import type { TKey, TObserver, TPath, TSubject } from "../types";

export const createGetTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubject, key: TKey) => {
        observer({
            type: "get",
            key: (path + key).split("").join("."),
            value: target[key],
        });
        return target[key];
    };
};
