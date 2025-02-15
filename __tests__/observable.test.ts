import { createObservable } from "../src/index";

describe("createObservable", () => {
    it("should create an observable object that tracks get operations", () => {
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
        const subject: Record<string, unknown> = { name: "John", age: 30 };

        const observable = createObservable(subject, observer);

        delete observable.name;

        expect("name" in observable).toBe(false);
        expect(observer).toHaveBeenCalledWith({
            type: "delete",
            key: "name",
            value: "John",
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
});
