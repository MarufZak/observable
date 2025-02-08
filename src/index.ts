type ChangeType = "get" | "set" | "delete";
type ObserverType = (
  change: ChangeType,
  key: PropertyKey,
  oldValue: any,
  newValue: any
) => void;

const createObservable = (
  subject: Record<string, any>,
  observer: ObserverType
) => {
  return new Proxy(subject, {
    get(target, key: string, value) {
      observer("get", key, value, value);
      return target[key as string];
    },
    set(target, key: string, value) {
      const oldValue = target[key];
      target[key] = value;
      observer("set", key, oldValue, value);
      return true;
    },
    deleteProperty(target, key: string) {
      let returnValue = false;
      if (key in target) {
        observer("delete", key, target[key], undefined);
        delete target[key];
        returnValue = true;
      } else {
        observer("delete", key, undefined, undefined);
        returnValue = false;
      }

      return returnValue;
    },
  });
};
