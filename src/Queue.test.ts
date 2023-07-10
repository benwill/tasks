import { describe, it } from "@jest/globals";

describe("example", () => {
  it("test1", () => {
    console.log("hi");
    const b = true;
    expect(b).toBe(true);
  });
});
