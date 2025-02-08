type ChangeType = "get" | "set";
type ObserverType = (
  change: ChangeType,
  key: PropertyKey,
  oldValue: string,
  newValue: string
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
  });
};
