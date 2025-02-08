import type { TObserver, TSubject } from "../types.js";

export const createGetTrap = (observer: TObserver) => {
    return (target: TSubject, key: string, value: string) => {
        observer({ type: "get", key, value });
        return target[key as string];
    };
};
