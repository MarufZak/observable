import { TGetPrototypeOfObserver, TObserver, TPath, TSubject } from "../types";

export const createGetPrototypeOfTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubject) => {
        const observerArg: TGetPrototypeOfObserver = {
            type: "getPrototypeOf",
        };

        // object can be property of another object,
        // so we include path to the observer output.
        if (path) {
            observerArg.path = path;
        }

        observer(observerArg);

        return Reflect.getPrototypeOf(target);
    };
};
