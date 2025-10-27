import { encodePrompt } from "../src/utils";

describe("encodePrompt", () => {
  test("encodes with known model", () => {
    const tokens = encodePrompt({
      prompt: "hello world",
      model: "gpt-4o-mini",
    });
    expect(typeof tokens).toBe("number");
    expect(tokens).toBeGreaterThan(0);
  });

  test("falls back when model is unknown", () => {
    const tokens = encodePrompt({
      prompt: "fallback path",
      model: "non-existent-model",
    });
    expect(typeof tokens).toBe("number");
    expect(tokens).toBeGreaterThan(0);
  });
});
