import { TObserver, TPath, TSubjectObject } from "../types";

export const createApplyTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubjectObject, thisArg: any, args: any) => {
        observer({
            type: "apply",
            key: path,
            args,
        });

        return target.apply(thisArg, args);
    };
};
