import {
    TApplyObserver,
    TArgs,
    TObserver,
    TPath,
    TSubjectObject,
    TThisArg,
} from "../types";

export const createApplyTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubjectObject, thisArg: TThisArg, args: TArgs) => {
        const observerArg: TApplyObserver = { type: "apply", args };

        if (path) {
            observerArg.key = path;
        }

        observer(observerArg);

        return target.apply(thisArg, args);
    };
};
