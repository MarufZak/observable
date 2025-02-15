import { getObjectTrace } from "../src/utils";

describe("getObjectTrace", () => {
    it("should join keys with dots", () => {
        expect(getObjectTrace("user", "address", "city")).toBe(
            "u.s.e.r.a.d.d.r.e.s.s.c.i.t.y"
        );
    });

    it("should handle empty strings", () => {
        expect(getObjectTrace("")).toBe("");
    });

    it("should handle single key", () => {
        expect(getObjectTrace("name")).toBe("n.a.m.e");
    });
});
