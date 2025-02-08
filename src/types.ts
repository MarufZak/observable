export type TSubject = Record<string, any>;

interface TGetObserver {
    type: "get";
    key: string;
    value: string;
}

interface TSetObserver {
    type: "set";
    key: string;
    oldValue: string;
    newValue: string;
}

interface TDeleteObserver {
    type: "delete";
    key: string;
    value: string;
}

export type TObserver = (
    args: TGetObserver | TSetObserver | TDeleteObserver
) => void;
