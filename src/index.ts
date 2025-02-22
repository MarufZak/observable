import { getTraps } from "./traps";
import type { TObserver, TPath, TSubject } from "./types";
import { getObjectTrace, isObjectSubject, isPrimitiveType } from "./utils";

export function createObservable<TObservableSubject extends TSubject>(
    subject: TObservableSubject,
    observer: TObserver,
    path: TPath = ""
) {
    const traps = getTraps(observer, path);

    if (isObjectSubject(subject)) {
        for (const key in subject) {
            if (isPrimitiveType(subject[key])) {
                continue;
            }

            subject[key] = createObservable(
                subject[key],
                observer,
                getObjectTrace(path, key)
            );
        }
    }

    return new Proxy<TObservableSubject>(subject, traps);
}
