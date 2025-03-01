import type { TObserver, TOwnKeysObserver, TPath, TSubjectObject } from "../types";

export const createOwnKeysTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubjectObject) => {
        const keys = Reflect.ownKeys(target);

        const observerArg: TOwnKeysObserver = {
            type: "ownKeys",
            value: keys,
        };

        if (path) {
            observerArg.path = path;
        }

        observer(observerArg);

        return keys;
    };
};
