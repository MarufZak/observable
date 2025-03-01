import {
    TObserver,
    TPath,
    TProto,
    TSetPrototypeOfObserver,
    TSubject,
} from "../types";

export const createSetPrototypeOfTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubject, proto: TProto) => {
        const observerArg: TSetPrototypeOfObserver = {
            type: "setPrototypeOf",
            proto: proto,
        };

        // object can be property of another object,
        // so we include path to the observer output.
        if (path) {
            observerArg.path = path;
        }

        observer(observerArg);

        return Reflect.setPrototypeOf(target, proto);
    };
};
