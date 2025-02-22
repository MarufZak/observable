import type { TKey, TObserver, TPath, TReceiver, TSubjectObject } from "../types";
import { getObjectTrace } from "../utils";

export const createGetTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubjectObject, key: TKey, receiver: TReceiver) => {
        observer({
            type: "get",
            key: getObjectTrace(path, key),
            value: target[key],
        });

        return Reflect.get(target, key, receiver);
    };
};
