import {
    TProxyKey,
    TGetOwnPropertyDescriptorObserver,
    TObserver,
    TPath,
    TSubject,
} from "../types";

export const createGetOwnPropertyDescriptorTrap = (
    observer: TObserver,
    path: TPath
) => {
    return (target: TSubject, key: TProxyKey) => {
        const observerArg: TGetOwnPropertyDescriptorObserver = {
            requestedKey: key,
            type: "getOwnPropertyDescriptor",
        };

        if (path) {
            observerArg.key = path;
        }

        observer(observerArg);

        return Reflect.getOwnPropertyDescriptor(target, key);
    };
};
