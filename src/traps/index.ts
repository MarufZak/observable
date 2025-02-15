import { createSetTrap } from "./set";
import { createGetTrap } from "./get";
import type { TObserver, TPath } from "../types";
import { createDeletePropertyTrap } from "./deleteProperty";

export const getTraps = (observer: TObserver, path: TPath) => {
    const get = createGetTrap(observer, path);
    const set = createSetTrap(observer, path);
    const deleteProperty = createDeletePropertyTrap(observer);

    return {
        get,
        set,
        deleteProperty,
    };
};
