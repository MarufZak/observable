import { createSetTrap } from "./set";
import { createGetTrap } from "./get";
import type { TObserver, TPath } from "../types";
import { createDeletePropertyTrap } from "./deleteProperty";
import { createOwnKeysTrap } from "./ownKeys";
import { createHasTrap } from "./has";
import { createApplyTrap } from "./apply";
import { createConstructTrap } from "./construct";
import { createGetPrototypeOfTrap } from "./getPrototypeOf";
import { createSetPrototypeOfTrap } from "./setPrototypeOf";
import { createIsExtensibleTrap } from "./isExtensible";
import { createPreventExtensionsTrap } from "./preventExtensions";
import { createDefinePropertyTrap } from "./defineProperty";
import { createGetOwnPropertyDescriptorTrap } from "./getOwnPropertyDescriptor";

export const getTraps = (observer: TObserver, path: TPath) => {
    const get = createGetTrap(observer, path);
    const has = createHasTrap(observer, path);
    const ownKeys = createOwnKeysTrap(observer, path);
    const set = createSetTrap(observer, path);
    const deleteProperty = createDeletePropertyTrap(observer, path);
    const apply = createApplyTrap(observer, path);
    const construct = createConstructTrap(observer);
    const getPrototypeOf = createGetPrototypeOfTrap(observer, path);
    const setPrototypeOf = createSetPrototypeOfTrap(observer, path);
    const isExtensible = createIsExtensibleTrap(observer, path);
    const preventExtensions = createPreventExtensionsTrap(observer, path);
    const defineProperty = createDefinePropertyTrap(observer, path);
    const getOwnPropertyDescriptor = createGetOwnPropertyDescriptorTrap(
        observer,
        path
    );

    return {
        get,
        has,
        ownKeys,
        set,
        deleteProperty,
        apply,
        construct,
        getPrototypeOf,
        setPrototypeOf,
        isExtensible,
        preventExtensions,
        defineProperty,
        getOwnPropertyDescriptor,
    };
};
