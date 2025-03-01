import { TIsExtensibleObserver, TObserver, TPath, TSubject } from "../types";

export const createIsExtensibleTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubject) => {
        const observerArg: TIsExtensibleObserver = {
            type: "isExtensible",
        };

        if (path) {
            observerArg.path = path;
        }

        observer(observerArg);

        return Reflect.isExtensible(target);
    };
};
