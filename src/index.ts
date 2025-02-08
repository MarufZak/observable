import { getTraps } from "./traps/index.js";
import type { TObserver, TSubject } from "./types.js";

export function createObservable(subject: TSubject, observer: TObserver) {
    const { get, set, deleteProperty } = getTraps(observer);

    return new Proxy(subject, {
        get,
        set,
        deleteProperty,
    });
}
