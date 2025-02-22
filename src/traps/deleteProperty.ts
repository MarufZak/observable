import type { TKey, TObserver, TPath, TSubjectObject } from "../types";
import { getObjectTrace } from "../utils";

export const createDeletePropertyTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubjectObject, key: TKey) => {
        observer({
            type: "delete",
            key: getObjectTrace(path, key),
            value: target[key],
        });

        return Reflect.deleteProperty(target, key);
    };
};
