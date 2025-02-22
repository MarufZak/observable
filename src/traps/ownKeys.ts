import type { TObserver, TPath, TSubjectObject } from "../types";
import { getObjectTrace } from "../utils";

export const createOwnKeysTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubjectObject) => {
        const keys = Object.keys(target);

        observer({
            type: "ownKeys",
            key: path ? getObjectTrace(path) : null,
            value: keys,
        });

        return Reflect.ownKeys(target);
    };
};
