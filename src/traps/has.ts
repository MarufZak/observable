import { TKey, TObserver, TPath, TSubjectObject } from "../types";
import { getObjectTrace } from "../utils";

export const createHasTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubjectObject, key: TKey) => {
        observer({
            type: "has",
            key: getObjectTrace(path, key),
        });

        return key in target;
    };
};
