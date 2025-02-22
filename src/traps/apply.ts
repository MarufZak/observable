import { TArgs, TObserver, TPath, TSubjectObject, TThisArg } from "../types";

export const createApplyTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubjectObject, thisArg: TThisArg, args: TArgs) => {
        observer({
            type: "apply",
            key: path,
            args,
        });

        return target.apply(thisArg, args);
    };
};
