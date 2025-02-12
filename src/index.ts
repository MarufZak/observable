import { getTraps } from "./traps/index";
import type { TObserver, TSubject } from "./types";

export function createObservable(subject: TSubject, observer: TObserver) {
    const { get, set, deleteProperty } = getTraps(observer);

    return new Proxy(subject, {
        get,
        set,
        deleteProperty,
    });
}
