import { getTraps } from "./traps/index";
import type { TObserver, TPath, TSubject } from "./types";

export function createObservable(
    subject: TSubject,
    observer: TObserver,
    path: TPath = ""
) {
    const finalSubject = subject;
    const { get, set, deleteProperty } = getTraps(observer, path);

    for (const key in subject) {
        if (typeof subject[key] !== "object") {
            continue;
        }

        finalSubject[key] = createObservable(subject[key], observer, path + key);
    }

    return new Proxy(subject, {
        get,
        set,
        deleteProperty,
    });
}
