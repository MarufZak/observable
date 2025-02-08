import type { TObserver } from "../types.js";
import { createGetTrap } from "./get.js";

export const getTraps = (observer: TObserver) => {
    const get = createGetTrap(observer);

    return {
        get,
    };
};
