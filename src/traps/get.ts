import type { TKey, TObserver, TPath, TSubject } from "../types";
import { getObjectTrace } from "../utils";

export const createGetTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubject, key: TKey) => {
        observer({
            type: "get",
            key: getObjectTrace(path, key),
            value: target[key],
        });
        return target[key];
    };
};
