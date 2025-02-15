import type { TKey, TObserver, TPath, TSubjectObject } from "../types";
import { getObjectTrace } from "../utils";

export const createDeletePropertyTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubjectObject, key: TKey) => {
        const isPresent = key in target;
        const value = target[key];
        if (isPresent) delete target[key];
        observer({
            type: "delete",
            key: getObjectTrace(path, key),
            value,
        });

        return isPresent;
    };
};
