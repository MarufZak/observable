import { TObserver, TPath, TPreventExtensionsObserver, TSubject } from "../types";

export const createPreventExtensionsTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubject) => {
        const observerArg: TPreventExtensionsObserver = {
            type: "isExtensible",
        };

        if (path) {
            observerArg.key = path;
        }

        observer(observerArg);

        return Reflect.preventExtensions(target);
    };
};
