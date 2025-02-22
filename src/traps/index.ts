import { createSetTrap } from "./set";
import { createGetTrap } from "./get";
import type { TObserver, TPath } from "../types";
import { createDeletePropertyTrap } from "./deleteProperty";
import { createOwnKeysTrap } from "./ownKeys";
import { createHasTrap } from "./has";
import { createApplyTrap } from "./apply";

export const getTraps = (observer: TObserver, path: TPath) => {
    const get = createGetTrap(observer, path);
    const has = createHasTrap(observer, path);
    const ownKeys = createOwnKeysTrap(observer, path);
    const set = createSetTrap(observer, path);
    const deleteProperty = createDeletePropertyTrap(observer, path);
    const apply = createApplyTrap(observer, path);

    return {
        get,
        has,
        ownKeys,
        set,
        deleteProperty,
        apply,
    };
};
