import { getObjectTrace } from "../src/utils";

describe("getObjectTrace", () => {
    it("should join keys with dots", () => {
        expect(getObjectTrace("user", "address", "city")).toBe("user.address.city");
    });

    it("should handle empty strings", () => {
        expect(getObjectTrace("")).toBe("");
    });

    it("should handle single key", () => {
        expect(getObjectTrace("name")).toBe("name");
    });
});
