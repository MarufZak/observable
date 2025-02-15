import type { TKey, TObserver, TPath, TSubjectObject } from "../types";
import { getObjectTrace } from "../utils";

export const createGetTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubjectObject, key: TKey) => {
        observer({
            type: "get",
            key: getObjectTrace(path, key),
            value: target[key],
        });
        return target[key];
    };
};
