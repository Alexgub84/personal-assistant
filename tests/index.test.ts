import { hello } from "../src/index";

describe("Basic Tests", () => {
  test("hello function returns greeting", () => {
    expect(hello()).toBe("Hello, World!");
  });
});
