export type TKey = string;
export type TValue = any;
export type TArgs = readonly any[];
export type TThisArg = any;
export type TReceiver = unknown;
export type TSubjectFunction = (...args: TArgs) => any;
export type TSubjectObject = Record<string, TValue>;
export type TSubject = TSubjectObject | TSubjectFunction;
export type TPath = string;
// although object type can be confusing.
// we want to be consistent with native types.
export type TProto = object | null;
export type TAttributes = PropertyDescriptor & ThisType<any>;
export type TProxyKey = PropertyKey;

export type ObservableOptions = {
    _path?: TPath;
    isRecursive?: boolean;
};

export type TGetObserver = {
    type: "get";
    path: TPath;
    value: string;
};

export type THasObserver = {
    type: "has";
    path: TPath;
};

export type TOwnKeysObserver = {
    type: "ownKeys";
    path?: TPath;
    value: Array<string | symbol>;
};

export type TSetObserver = {
    type: "set";
    path: TPath;
    oldValue: string;
    newValue: string;
};

export type TDeleteObserver = {
    type: "delete";
    path: TPath;
    value: string;
};

export type TApplyObserver = {
    type: "apply";
    path?: TPath;
    args: TArgs;
};

export type TConstructObserver = {
    type: "construct";
    args: TArgs;
};

export type TGetPrototypeOfObserver = {
    type: "getPrototypeOf";
    path?: TPath;
};

export type TSetPrototypeOfObserver = {
    type: "setPrototypeOf";
    proto: TProto;
    path?: TPath;
};

export type TIsExtensibleObserver = {
    type: "isExtensible";
    path?: TPath;
};

export type TPreventExtensionsObserver = {
    type: "preventExtensions";
    path?: TPath;
};

export type TDefinePropertyObserver = {
    type: "defineProperty";
    attributes: TAttributes;
    definedKey: TProxyKey;
    path?: TPath;
};

export type TGetOwnPropertyDescriptorObserver = {
    type: "getOwnPropertyDescriptor";
    requestedKey: TProxyKey;
    path?: TPath;
};

export type TObserver = (
    args:
        | TGetObserver
        | TSetObserver
        | TDeleteObserver
        | TOwnKeysObserver
        | THasObserver
        | TApplyObserver
        | TConstructObserver
        | TGetPrototypeOfObserver
        | TSetPrototypeOfObserver
        | TIsExtensibleObserver
        | TPreventExtensionsObserver
        | TDefinePropertyObserver
        | TGetOwnPropertyDescriptorObserver
) => void;
