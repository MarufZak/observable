export type TKey = string;
export type TValue = any;
export type TSubjectFunction = (...args: any) => any;
export type TSubjectObject = Record<string, TValue>;
export type TSubject = TSubjectObject | TSubjectFunction;
export type TPath = string;

export type TGetObserver = {
    type: "get";
    key: string;
    value: string;
};

export type THasObserver = {
    type: "has";
    key: string;
};

export type TOwnKeysObserver = {
    type: "ownKeys";
    key: string | null;
    value: string[];
};

export type TSetObserver = {
    type: "set";
    key: string;
    oldValue: string;
    newValue: string;
};

export type TDeleteObserver = {
    type: "delete";
    key: string;
    value: string;
};

export type TApplyObserver = {
    type: "apply";
    key: string;
    args: any;
};

export type TObserver = (
    args:
        | TGetObserver
        | TSetObserver
        | TDeleteObserver
        | TOwnKeysObserver
        | THasObserver
        | TApplyObserver
) => void;
