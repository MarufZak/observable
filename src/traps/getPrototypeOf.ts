import {
    TGetPrototypeOfObserver,
    TObserver,
    TPath,
    TSubjectObject,
} from "../types";

export const createGetPrototypeOfTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubjectObject) => {
        const observerArg: TGetPrototypeOfObserver = {
            type: "getPrototypeOf",
        };

        if (path) {
            observerArg.key = path;
        }

        observer(observerArg);

        return Reflect.getPrototypeOf(target);
    };
};
