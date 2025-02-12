import { createSetTrap } from "./set";
import { createGetTrap } from "./get";
import type { TObserver } from "../types";
import { createDeletePropertyTrap } from "./deleteProperty";

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
