import { getTraps } from "./traps/index";
import type { TObserver, TPath, TSubjectObject } from "./types";
import { getObjectTrace } from "./utils";

export function createObservable<TObservableSubject extends TSubjectObject>(
    subject: TObservableSubject,
    observer: TObserver,
    path: TPath = ""
) {
    const finalSubject = subject;
    const traps = getTraps(observer, path);

    for (const key in finalSubject) {
        if (typeof subject[key] !== "object") {
            continue;
        }

        finalSubject[key] = createObservable(
            finalSubject[key],
            observer,
            getObjectTrace(path, key)
        );
    }

    return new Proxy<TObservableSubject>(finalSubject, traps);
}
