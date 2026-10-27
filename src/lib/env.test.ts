import { describe, expect, it } from "vitest";
import { parseEnv } from "./env";

describe("parseEnv", () => {
  it("usa il default per NODE_ENV quando mancante", () => {
    expect(parseEnv({}).NODE_ENV).toBe("development");
  });

  it("rifiuta un NODE_ENV non valido", () => {
    expect(() => parseEnv({ NODE_ENV: "staging" })).toThrow();
  });

  it("accetta una GEMINI_API_KEY non vuota", () => {
    expect(parseEnv({ GEMINI_API_KEY: "x" }).GEMINI_API_KEY).toBe("x");
  });
});
