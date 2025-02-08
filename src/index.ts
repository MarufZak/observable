type ChangeType = "get";
type ObserverType = (
  change: ChangeType,
  key: PropertyKey,
  oldValue: string,
  newValue: string
) => void;

const createObservable = (
  subject: Record<string, unknown>,
  observer: ObserverType
) => {
  return new Proxy(subject, {
    get(target, key, value) {
      observer("get", key, value, value);
      return target[key as string];
    },
  });
};

const target: Record<string, unknown> = { ok: "ok" };
const observable = createObservable(target, () => {});

const t = observable.ok;
console.log({ t });
