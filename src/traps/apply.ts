import {
    TApplyObserver,
    TArgs,
    TObserver,
    TPath,
    TSubject,
    TSubjectFunction,
    TThisArg,
} from "../types";

export const createApplyTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubject, thisArg: TThisArg, args: TArgs) => {
        const observerArg: TApplyObserver = { type: "apply", args };

        if (path) {
            observerArg.path = path;
        }

        observer(observerArg);

        return Reflect.apply(target as TSubjectFunction, thisArg, args);
    };
};
