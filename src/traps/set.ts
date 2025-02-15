import type { TKey, TObserver, TPath, TSubjectObject, TValue } from "../types";
import { getObjectTrace } from "../utils";

export const createSetTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubjectObject, key: TKey, value: TValue) => {
        const oldValue = target[key];
        target[key] = value;
        observer({
            type: "set",
            key: getObjectTrace(path, key),
            oldValue,
            newValue: value,
        });
        return true;
    };
};
