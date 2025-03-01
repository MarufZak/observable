import { createObservable } from "../src/index";
import { TSubjectFunction, TSubjectObject } from "../src/types";

describe("createObservable", () => {
    it("should track get operations", () => {
        const observer = jest.fn();
        const subject: TSubjectObject = { name: "John", age: 30 };

        const observable = createObservable(subject, observer);

        const name = observable.name;

        expect(name).toBe("John");
        expect(observer).toHaveBeenCalledWith({
            type: "get",
            key: "name",
            value: "John",
        });
    });

    it("should track set operations", () => {
        const observer = jest.fn();
        const subject: TSubjectObject = { name: "John", age: 30 };

        const observable = createObservable(subject, observer);

        observable.name = "Jane";

        expect(observable.name).toBe("Jane");
        expect(observer).toHaveBeenCalledWith({
            type: "set",
            key: "name",
            oldValue: "John",
            newValue: "Jane",
        });
    });

    it("should track delete operations", () => {
        const observer = jest.fn();
        const subject: TSubjectObject = { name: "John", age: 30 };

        const observable = createObservable(subject, observer);

        delete observable.name;

        expect("name" in observable).toBe(false);
        expect(observer).toHaveBeenCalledWith({
            type: "delete",
            key: "name",
            value: "John",
        });
    });

    it("should track ownKeys operations", () => {
        const observer = jest.fn();
        const subject: TSubjectObject = { name: "John", age: 30 };

        const observable = createObservable(subject, observer);

        const keys = Object.keys(observable);

        expect(keys).toMatchObject(["name", "age"]);
        expect(observer).toHaveBeenCalledWith({
            type: "ownKeys",
            key: null,
            value: ["name", "age"],
        });
    });

    it("should track has operations", () => {
        const observer = jest.fn();
        const subject: TSubjectObject = { name: "John", age: 30 };

        const observable = createObservable(subject, observer);
        const result = "name" in observable;

        expect(result).toBe(true);
        expect(observer).toHaveBeenCalledWith({
            type: "has",
            key: "name",
        });
    });

    it("should track apply operations", () => {
        const observer = jest.fn();
        const subject: TSubjectFunction = (args: any) => args;

        const observable = createObservable(subject, observer);
        const result = observable("ok");

        expect(result).toBe("ok");
        expect(observer).toHaveBeenCalledWith({
            type: "apply",
            args: ["ok"],
        });
    });

    it("should track getPrototypeOf operations", () => {
        const observer = jest.fn();
        class Example {}
        const subject = Object.create(Example);
        const observable = createObservable(subject, observer);

        const proto = Object.getPrototypeOf(observable);
        expect(proto).toBe(Example);
        expect(observer).toHaveBeenCalledWith({
            type: "getPrototypeOf",
        });
    });

    it("should track setPrototypeOf operations", () => {
        const observer = jest.fn();
        class Proto {}
        const subject = {};
        const observable = createObservable(subject, observer);

        const result = Object.setPrototypeOf(observable, Proto);
        expect(result).toBe(observable);
        expect(observer).toHaveBeenCalledWith({
            type: "setPrototypeOf",
            proto: Proto,
        });
    });

    it("should track isExtensible operations", () => {
        const observer = jest.fn();
        const subject: Record<string, string> = {};

        const observable = createObservable(subject, observer);
        expect(Object.isExtensible(observable)).toBe(true);
        expect(observer).toHaveBeenCalledWith({
            type: "isExtensible",
        });

        Object.preventExtensions(observable);

        expect(() => {
            observable.a = "a";
        }).toThrow(TypeError);
        expect(Object.isExtensible(observable)).toBe(false);
        expect(observer).toHaveBeenCalledWith({
            type: "isExtensible",
        });
    });

    it("should track preventExtensions operations", () => {
        const observer = jest.fn();
        const subject: Record<string, string> = {};

        const observable = createObservable(subject, observer);

        Object.preventExtensions(observable);

        expect(() => {
            observable.a = "a";
        }).toThrow(TypeError);
        expect(Object.isExtensible(observable)).toBe(false);
        expect(observer).toHaveBeenCalledWith({
            type: "preventExtensions",
        });
    });

    it("should track construct operations", () => {
        class Example {
            name = "";

            constructor(name: string) {
                this.name = name;
            }
        }

        const observer = jest.fn();

        const ProxiedExample = createObservable(Example, observer);
        const result = new ProxiedExample("myname");

        expect(result).toEqual({
            name: "myname",
        });
        expect(observer).toHaveBeenCalledWith({
            type: "construct",
            args: ["myname"],
        });
    });

    it("should handle nested get operations", () => {
        const observer = jest.fn();
        const subject: TSubjectObject = {
            user: {
                name: "John",
                address: {
                    details: {
                        street: "Broadway",
                    },
                },
            },
        };

        const observable = createObservable(subject, observer);

        const street = observable.user.address.details.street;
        expect(street).toBe("Broadway");
        expect(observer).toHaveBeenLastCalledWith({
            type: "get",
            key: "user.address.details.street",
            value: "Broadway",
        });
    });

    it("should handle nested set operations", () => {
        const observer = jest.fn();
        const subject: TSubjectObject = {
            user: {
                address: {
                    details: {
                        zip: "10001",
                    },
                },
            },
        };

        const observable = createObservable(subject, observer);

        observable.user.address.details.zip = "10002";

        expect(subject.user.address.details.zip).toBe("10002");
        expect(observer).toHaveBeenCalledWith({
            type: "set",
            key: "user.address.details.zip",
            oldValue: "10001",
            newValue: "10002",
        });
    });

    it("should handle nested delete operations", () => {
        const observer = jest.fn();
        const subject: TSubjectObject = {
            user: {
                address: {
                    details: {
                        street: "Broadway",
                    },
                },
            },
        };

        const observable = createObservable(subject, observer);
        delete observable.user.address.details.street;

        expect(observer).toHaveBeenLastCalledWith({
            type: "delete",
            key: "user.address.details.street",
            value: "Broadway",
        });
        expect(subject.user.address.details.street).not.toBeDefined();
    });

    it("should handle nested ownKeys operations", () => {
        const observer = jest.fn();
        const subject: TSubjectObject = {
            user: {
                address: {
                    details: {
                        zip: "10001",
                    },
                },
            },
        };

        const observable = createObservable(subject, observer);
        const keys = Object.keys(observable.user.address.details);

        expect(keys).toEqual(["zip"]);
        expect(observer).toHaveBeenLastCalledWith({
            type: "ownKeys",
            key: "user.address.details",
            value: ["zip"],
        });
    });

    it("should handle nested has operations", () => {
        const observer = jest.fn();
        const subject: TSubjectObject = {
            user: {
                address: {
                    details: {
                        zip: "10001",
                    },
                },
            },
        };

        const observable = createObservable(subject, observer);
        const result = "zip" in observable.user.address.details;

        expect(result).toBe(true);
        expect(observer).toHaveBeenNthCalledWith(4, {
            type: "has",
            key: "user.address.details.zip",
        });
    });

    it("should handle nested apply operations", () => {
        const observer = jest.fn();
        const subject: TSubjectObject = {
            user: {
                address: {
                    details: {
                        isAvailable: (cond1: boolean, cond2: boolean) =>
                            cond1 && cond2,
                    },
                },
            },
        };

        const args = [true, true];

        const observable = createObservable(subject, observer);
        observable.user.address.details.isAvailable(...args);

        expect(observer).toHaveBeenCalledWith({
            type: "apply",
            key: "user.address.details.isAvailable",
            args,
        });
    });

    it("should handle nested getPrototypeOf operations", () => {
        const observer = jest.fn();
        class Example {}
        const subject = {
            falseSubject: { trueSubject: Object.create(Example) },
        };
        const observable = createObservable(subject, observer);

        const proto = Object.getPrototypeOf(observable.falseSubject.trueSubject);
        expect(proto).toBe(Example);
        expect(observer).toHaveBeenNthCalledWith(3, {
            type: "getPrototypeOf",
            key: "falseSubject.trueSubject",
        });
    });

    it("should handle nested setPrototypeOf operations", () => {
        const observer = jest.fn();
        class Proto {}
        const subject = {
            falseSubject: { trueSubject: {} },
        };
        const observable = createObservable(subject, observer);

        const result = Object.setPrototypeOf(
            observable.falseSubject.trueSubject,
            Proto
        );
        expect(result).toBe(subject.falseSubject.trueSubject);
        expect(observer).toHaveBeenCalledWith({
            type: "setPrototypeOf",
            key: "falseSubject.trueSubject",
            proto: Proto,
        });
    });

    it("should handle nested isExtensible operations", () => {
        const observer = jest.fn();
        const subject: any = {
            falseSubject: { trueSubject: {} },
        };

        const observable = createObservable(subject, observer);
        expect(Object.isExtensible(observable.falseSubject.trueSubject)).toBe(true);
        expect(observer).toHaveBeenCalledWith({
            type: "isExtensible",
            key: "falseSubject.trueSubject",
        });

        Object.preventExtensions(observable.falseSubject.trueSubject);

        expect(() => {
            observable.falseSubject.trueSubject.a = "a";
        }).toThrow(TypeError);
        expect(Object.isExtensible(observable.falseSubject.trueSubject)).toBe(
            false
        );
        expect(observer).toHaveBeenCalledWith({
            type: "isExtensible",
            key: "falseSubject.trueSubject",
        });
    });

    it("should handle nested preventExtensions operations", () => {
        const observer = jest.fn();
        const subject: any = {
            falseSubject: { trueSubject: {} },
        };

        const observable = createObservable(subject, observer);

        Object.preventExtensions(observable.falseSubject.trueSubject);

        expect(() => {
            observable.falseSubject.trueSubject.a = "a";
        }).toThrow(TypeError);
        expect(Object.isExtensible(observable.falseSubject.trueSubject)).toBe(
            false
        );
        expect(Object.isExtensible(observable.falseSubject)).toBe(true);
        expect(observer).toHaveBeenCalledWith({
            type: "preventExtensions",
            key: "falseSubject.trueSubject",
        });
    });
});
