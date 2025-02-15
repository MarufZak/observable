import { createSetTrap } from "./set";
import { createGetTrap } from "./get";
import type { TObserver, TPath } from "../types";
import { createDeletePropertyTrap } from "./deleteProperty";
import { createOwnKeysTrap } from "./ownKeys";

export const getTraps = (observer: TObserver, path: TPath) => {
    const get = createGetTrap(observer, path);
    const ownKeys = createOwnKeysTrap(observer, path);
    const set = createSetTrap(observer, path);
    const deleteProperty = createDeletePropertyTrap(observer, path);

    return {
        get,
        ownKeys,
        set,
        deleteProperty,
    };
};
