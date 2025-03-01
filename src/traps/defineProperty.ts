import {
    TAttributes,
    TProxyKey,
    TDefinePropertyObserver,
    TObserver,
    TPath,
    TSubject,
} from "../types";

export const createDefinePropertyTrap = (observer: TObserver, path: TPath) => {
    return (target: TSubject, definedKey: TProxyKey, attributes: TAttributes) => {
        const observerArg: TDefinePropertyObserver = {
            attributes,
            type: "defineProperty",
            definedKey,
        };

        if (path) {
            observerArg.key = path;
        }

        observer(observerArg);

        return Reflect.defineProperty(target, definedKey, attributes);
    };
};
