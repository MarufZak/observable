import type { TKey, TObserver, TSubject } from "../types";

export const createDeletePropertyTrap = (observer: TObserver) => {
    return (target: TSubject, key: TKey) => {
        const isPresent = key in target;
        if (isPresent) delete target[key];
        observer({ type: "delete", key, value: target[key] });

        return isPresent;
    };
};
