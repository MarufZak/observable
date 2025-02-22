import { createObservable } from "../src/index";
import { TSubjectObject } from "../src/types";

describe("createObservable", () => {
    it("should track get operations", () => {
        const observer = jest.fn();
        const subject = { name: "John", age: 30 };

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
        const subject = { name: "John", age: 30 };

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
        const subject = { name: "John", age: 30 };

        const observable = createObservable(subject, observer);

        Object.keys(observable);

        expect(observer).toHaveBeenCalledWith({
            type: "ownKeys",
            key: null,
            value: ["name", "age"],
        });
    });

    it("should handle nested objects", () => {
        const observer = jest.fn();
        const subject = {
            user: {
                name: "John",
                address: {
                    city: "New York",
                },
            },
        };

        const observable = createObservable(subject, observer);

        const oldCity = observable.user.address.city;
        observable.user.address.city = "London";

        expect(oldCity).toBe("New York");
        expect(observable.user.address.city).toBe("London");
        expect(observer).toHaveBeenCalledWith({
            type: "set",
            key: "user.address.city",
            oldValue: "New York",
            newValue: "London",
        });
    });

    it("should handle nested objects with multiple operations", () => {
        const observer = jest.fn();
        const subject: TSubjectObject = {
            user: {
                name: "John",
                address: {
                    city: "New York",
                    details: {
                        street: "Broadway",
                        zip: "10001",
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

        observable.user.address.details.zip = "10002";
        expect(observer).toHaveBeenCalledWith({
            type: "set",
            key: "user.address.details.zip",
            oldValue: "10001",
            newValue: "10002",
        });

        delete observable.user.address.details.street;
        expect(observer).toHaveBeenLastCalledWith({
            type: "delete",
            key: "user.address.details.street",
            value: "Broadway",
        });

        Object.keys(observable.user.address.details);
        expect(observer).toHaveBeenLastCalledWith({
            type: "ownKeys",
            key: "user.address.details",
            value: ["zip"],
        });
    });
});
