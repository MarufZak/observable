import { getTraps } from "./traps/index";
import type { TObserver, TPath, TSubject } from "./types";
import { getObjectTrace, isObjectSubject } from "./utils";

export function createObservable<TObservableSubject extends TSubject>(
    subject: TObservableSubject,
    observer: TObserver,
    path: TPath = ""
) {
    const finalSubject = subject;
    const traps = getTraps(observer, path);

    if (isObjectSubject(finalSubject)) {
        for (const key in finalSubject) {
            if (typeof finalSubject[key] !== "object" || !finalSubject[key]) {
                continue;
            }

            finalSubject[key] = createObservable(
                finalSubject[key],
                observer,
                getObjectTrace(path, key)
            );
        }
    } else {
        console.log();
    }

    return new Proxy<TObservableSubject>(finalSubject, traps);
}
