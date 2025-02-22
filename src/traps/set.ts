import type { TKey, TObserver, TPath, TSubjectObject, TValue } from "../types";
import { getObjectTrace } from "../utils";

export const createSetTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubjectObject, key: TKey, value: TValue) => {
        observer({
            type: "set",
            key: getObjectTrace(path, key),
            oldValue: target[key],
            newValue: value,
        });

        return Reflect.set(target, key, value);
    };
};
