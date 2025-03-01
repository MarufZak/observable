import { TArgs, TObserver, TSubject, TSubjectFunction } from "../types";

export const createConstructTrap = (observer: TObserver) => {
    return (target: TSubject, args: TArgs, newTarget: TSubject) => {
        observer({
            type: "construct",
            args,
        });

        return Reflect.construct(
            target as TSubjectFunction,
            args,
            newTarget as TSubjectFunction
        );
    };
};
