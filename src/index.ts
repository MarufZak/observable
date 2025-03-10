import { getTraps } from "./traps";
import type { ObservableOptions, TObserver, TSubject } from "./types";
import { getObjectTrace, isObjectSubject, isPrimitiveType } from "./utils";

export * from "./types";

export function createObservable<TObservableSubject extends TSubject>(
    subject: TObservableSubject,
    observer: TObserver,
    options?: ObservableOptions
) {
    const _path = options?._path || "";
    const traps = getTraps(observer, _path || "");

    if (isObjectSubject(subject) && options?.isRecursive) {
        for (const key in subject) {
            if (isPrimitiveType(subject[key])) {
                continue;
            }

            subject[key] = createObservable(subject[key], observer, {
                _path: getObjectTrace(_path || "", key),
                isRecursive: options?.isRecursive,
            });
        }
    }

    return new Proxy<TObservableSubject>(subject, traps);
}
