export type TKey = string;
export type TValue = any;
export type TSubject = Record<TKey, TValue>;
export type TPath = string;

export type TGetObserver = {
    type: "get";
    key: string;
    value: string;
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

export type TObserver = (
    args: TGetObserver | TSetObserver | TDeleteObserver
) => void;
