import { capitalize } from "./utils";

describe("utils", () => {
  describe("capitalize", () => {
    it("handles single word", () => {
      expect(capitalize("Test")).toEqual("Test");
      expect(capitalize("TEST")).toEqual("Test");
      expect(capitalize("test")).toEqual("Test");
    });
    it("handles sentence-like/multiple-words", () => {
      expect(capitalize("Test Plan")).toEqual("Test Plan");
      expect(capitalize("TEST PlAN")).toEqual("Test Plan");
      expect(capitalize("test plan")).toEqual("Test Plan");
    });
  });
});

export {};
