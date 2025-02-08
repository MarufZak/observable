import { createSetTrap } from "./set.js";
import { createGetTrap } from "./get.js";
import type { TObserver } from "../types.js";
import { createDeletePropertyTrap } from "./deleteProperty.js";

export const getTraps = (observer: TObserver) => {
    const get = createGetTrap(observer);
    const set = createSetTrap(observer);
    const deleteProperty = createDeletePropertyTrap(observer);

    return {
        get,
        set,
        deleteProperty,
    };
};
