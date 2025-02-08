type TSubject = Record<string, any>;

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

type TObserver = (args: TGetObserver | TSetObserver | TDeleteObserver) => void;

export function createObservable(subject: TSubject, observer: TObserver): TSubject {
    return new Proxy(subject, {
        get(target, key: string, value) {
            observer({ type: "get", key, value });
            return target[key as string];
        },
        set(target, key: string, value) {
            const oldValue = target[key];
            target[key] = value;
            observer({ type: "set", key, oldValue, newValue: value });
            return true;
        },
        deleteProperty(target, key: string) {
            let returnValue = false;
            if (key in target) {
                observer({ type: "delete", key, value: target[key] });
                delete target[key];
                returnValue = true;
            } else {
                observer({ type: "delete", key, value: target[key] });
                returnValue = false;
            }

            return returnValue;
        },
    });
}
