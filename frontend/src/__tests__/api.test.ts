import { sendChatMessage, ApiError } from "@/utils/api";

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("sendChatMessage", () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it("returns parsed response on success", async () => {
    const mockData = {
      reply: "Hello!",
      model: "gpt-4o-mini",
      usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await sendChatMessage([
      { role: "user", content: "Hi" },
    ]);

    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("throws ApiError on non-ok response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ detail: "Server error" }),
    });

    await expect(
      sendChatMessage([{ role: "user", content: "Hi" }])
    ).rejects.toThrow(ApiError);
  });

  it("throws ApiError on network failure", async () => {
    mockFetch.mockRejectedValueOnce(new TypeError("Network error"));

    await expect(
      sendChatMessage([{ role: "user", content: "Hi" }])
    ).rejects.toThrow(ApiError);
  });
});
