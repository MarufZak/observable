import { createObservable } from "../src/index";
import { TSubjectFunction, TSubjectObject } from "../src/types";

function createTestObservable(subject: TSubjectObject = { name: "John", age: 30 }) {
    const observer = jest.fn();
    const observable = createObservable(subject, observer);
    return { subject, observable, observer };
}

function createFunctionTestObservable(
    subject: TSubjectFunction = (args: any) => args
) {
    const observer = jest.fn();
    const observable = createObservable(subject, observer);
    return { subject, observable, observer };
}

describe("createObservable", () => {
    describe("Basic operations", () => {
        it("should track get operations", () => {
            const { observable, observer } = createTestObservable();

            const name = observable.name;

            expect(name).toBe("John");
            expect(observer).toHaveBeenCalledWith({
                type: "get",
                key: "name",
                value: "John",
            });
        });

        it("should track set operations", () => {
            const { observable, observer } = createTestObservable();

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
            const { observable, observer } = createTestObservable();

            delete observable.name;

            expect("name" in observable).toBe(false);
            expect(observer).toHaveBeenCalledWith({
                type: "delete",
                key: "name",
                value: "John",
            });
        });

        it("should track ownKeys operations", () => {
            const { observable, observer } = createTestObservable();

            const keys = Object.keys(observable);

            expect(keys).toMatchObject(["name", "age"]);
            expect(observer).toHaveBeenCalledWith({
                type: "ownKeys",
                key: null,
                value: ["name", "age"],
            });
        });

        it("should track has operations", () => {
            const { observable, observer } = createTestObservable();

            const result = "name" in observable;

            expect(result).toBe(true);
            expect(observer).toHaveBeenCalledWith({
                type: "has",
                key: "name",
            });
        });

        it("should track apply operations", () => {
            const functionSubject: TSubjectFunction = (args: any) => args;
            const { observable, observer } =
                createFunctionTestObservable(functionSubject);

            const result = observable("ok");

            expect(result).toBe("ok");
            expect(observer).toHaveBeenCalledWith({
                type: "apply",
                args: ["ok"],
            });
        });
    });

    describe("Prototype and extension operations", () => {
        it("should track getPrototypeOf operations", () => {
            class Example {}
            const subject = Object.create(Example);
            const { observable, observer } = createTestObservable(subject);

            const proto = Object.getPrototypeOf(observable);

            expect(proto).toBe(Example);
            expect(observer).toHaveBeenCalledWith({
                type: "getPrototypeOf",
            });
        });

        it("should track setPrototypeOf operations", () => {
            class Proto {}
            const { observable, observer } = createTestObservable({});

            const result = Object.setPrototypeOf(observable, Proto);

            expect(result).toBe(observable);
            expect(observer).toHaveBeenCalledWith({
                type: "setPrototypeOf",
                proto: Proto,
            });
        });

        it("should track isExtensible operations", () => {
            const { observable, observer } = createTestObservable({});

            expect(Object.isExtensible(observable)).toBe(true);
            expect(observer).toHaveBeenCalledWith({
                type: "isExtensible",
            });

            Object.preventExtensions(observable);

            expect(() => {
                (observable as any).a = "a";
            }).toThrow(TypeError);
            expect(Object.isExtensible(observable)).toBe(false);
            expect(observer).toHaveBeenCalledWith({
                type: "isExtensible",
            });
        });

        it("should track preventExtensions operations", () => {
            const { observable, observer } = createTestObservable({});

            Object.preventExtensions(observable);

            expect(() => {
                (observable as any).a = "a";
            }).toThrow(TypeError);
            expect(Object.isExtensible(observable)).toBe(false);
            expect(observer).toHaveBeenCalledWith({
                type: "preventExtensions",
            });
        });

        it("should track defineProperty operations", () => {
            const { subject, observable, observer } = createTestObservable({});

            const descriptor: PropertyDescriptor = {
                value: "test value",
                writable: true,
                enumerable: true,
                configurable: true,
            };

            const result = Object.defineProperty(observable, "newProp", descriptor);

            expect(result).toBe(observable);
            expect(subject.newProp).toBe("test value");
            expect(observer).toHaveBeenCalledWith({
                type: "defineProperty",
                definedKey: "newProp",
                attributes: descriptor,
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
    });

    describe("Nested object operations", () => {
        function createNestedTestSubject(): TSubjectObject {
            return {
                user: {
                    name: "John",
                    address: {
                        details: {
                            street: "Broadway",
                            zip: "10001",
                            isAvailable: (cond1: boolean, cond2: boolean) =>
                                cond1 && cond2,
                        },
                    },
                },
            };
        }

        it("should handle nested get operations", () => {
            const nestedSubject = createNestedTestSubject();
            const { observable, observer } = createTestObservable(nestedSubject);

            const street = observable.user.address.details.street;

            expect(street).toBe("Broadway");
            expect(observer).toHaveBeenLastCalledWith({
                type: "get",
                key: "user.address.details.street",
                value: "Broadway",
            });
        });

        it("should handle nested set operations", () => {
            const nestedSubject = createNestedTestSubject();
            const { observable, observer } = createTestObservable(nestedSubject);

            observable.user.address.details.zip = "10002";

            expect(nestedSubject.user.address.details.zip).toBe("10002");
            expect(observer).toHaveBeenCalledWith({
                type: "set",
                key: "user.address.details.zip",
                oldValue: "10001",
                newValue: "10002",
            });
        });

        it("should handle nested delete operations", () => {
            const nestedSubject = createNestedTestSubject();
            const { observable, observer } = createTestObservable(nestedSubject);

            delete observable.user.address.details.street;

            expect(observer).toHaveBeenLastCalledWith({
                type: "delete",
                key: "user.address.details.street",
                value: "Broadway",
            });
            expect(nestedSubject.user.address.details.street).not.toBeDefined();
        });

        it("should handle nested ownKeys operations", () => {
            const nestedSubject = createNestedTestSubject();
            const { observable, observer } = createTestObservable(nestedSubject);

            const keys = Object.keys(observable.user.address.details);

            expect(keys).toEqual(["street", "zip", "isAvailable"]);
            expect(observer).toHaveBeenNthCalledWith(4, {
                type: "ownKeys",
                key: "user.address.details",
                value: ["street", "zip", "isAvailable"],
            });
        });

        it("should handle nested has operations", () => {
            const nestedSubject = createNestedTestSubject();
            const { observable, observer } = createTestObservable(nestedSubject);

            const result = "zip" in observable.user.address.details;

            expect(result).toBe(true);
            expect(observer).toHaveBeenNthCalledWith(4, {
                type: "has",
                key: "user.address.details.zip",
            });
        });

        it("should handle nested apply operations", () => {
            const nestedSubject = createNestedTestSubject();
            const { observable, observer } = createTestObservable(nestedSubject);

            const args = [true, true];
            observable.user.address.details.isAvailable(...args);

            expect(observer).toHaveBeenCalledWith({
                type: "apply",
                key: "user.address.details.isAvailable",
                args,
            });
        });
    });

    describe("Advanced nested operations", () => {
        it("should handle nested getPrototypeOf operations", () => {
            class Example {}
            const subject = {
                falseSubject: { trueSubject: Object.create(Example) },
            };
            const { observable, observer } = createTestObservable(subject);

            const proto = Object.getPrototypeOf(
                observable.falseSubject.trueSubject
            );

            expect(proto).toBe(Example);
            expect(observer).toHaveBeenNthCalledWith(3, {
                type: "getPrototypeOf",
                key: "falseSubject.trueSubject",
            });
        });

        it("should handle nested setPrototypeOf operations", () => {
            class Proto {}
            const subject = {
                falseSubject: { trueSubject: {} },
            };
            const { observable, observer } = createTestObservable(subject);

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
            const subject: any = {
                falseSubject: { trueSubject: {} },
            };
            const { observable, observer } = createTestObservable(subject);

            expect(Object.isExtensible(observable.falseSubject.trueSubject)).toBe(
                true
            );
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
            const subject: any = {
                falseSubject: { trueSubject: {} },
            };
            const { observable, observer } = createTestObservable(subject);

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

        it("should handle nested defineProperty operations", () => {
            const subject: TSubjectObject = {
                nested: {},
            };
            const { observable, observer } = createTestObservable(subject);

            const descriptor: PropertyDescriptor = {
                value: "nested value",
                writable: true,
                enumerable: true,
                configurable: true,
            };

            const result = Object.defineProperty(
                observable.nested,
                "nestedProp",
                descriptor
            );

            expect(result).toBe(subject.nested);
            expect(subject.nested.nestedProp).toBe("nested value");
            expect(observer).toHaveBeenCalledWith({
                type: "defineProperty",
                key: "nested",
                definedKey: "nestedProp",
                attributes: descriptor,
            });
        });
    });
});
