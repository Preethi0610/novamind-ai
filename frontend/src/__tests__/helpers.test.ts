import { generateId, formatTime } from "@/utils/helpers";

describe("generateId", () => {
  it("returns a non-empty string", () => {
    const id = generateId();
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
  });

  it("generates unique IDs", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });
});

describe("formatTime", () => {
  it("formats a timestamp into a time string", () => {
    // Jan 15 2025, 14:30:00 UTC
    const ts = new Date("2025-01-15T14:30:00Z").getTime();
    const result = formatTime(ts);
    // Should contain hour and minute digits
    expect(result).toMatch(/\d{1,2}:\d{2}/);
  });
});
