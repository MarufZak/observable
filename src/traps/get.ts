import type { TKey, TObserver, TPath, TReceiver, TSubjectObject } from "../types";
import { getObjectTrace } from "../utils";

export const createGetTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubjectObject, key: TKey, receiver: TReceiver) => {
        const value = Reflect.get(target, key, receiver);

        observer({
            type: "get",
            key: getObjectTrace(path, key),
            value,
        });

        // Map uses its internal slot with this.[[MapData]] with methods
        // like Map.prototype.(get|set), but because `this` is Proxy, it
        // ends up with error. We might explicitly bind the context to original
        // object, but we won't, because we want to keep original proxying without
        // overhead. Same with other builtin objects, like Set, Date private fields
        // in classes with #, because they also use private fields.
        return value;
    };
};
