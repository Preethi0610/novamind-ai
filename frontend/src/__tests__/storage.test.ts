import { loadMessages, saveMessages, clearMessages } from "@/utils/storage";

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty array when nothing is stored", () => {
    expect(loadMessages()).toEqual([]);
  });

  it("persists and retrieves messages", () => {
    const msgs = [
      { id: "1", role: "user" as const, content: "hi", timestamp: 1000 },
      { id: "2", role: "assistant" as const, content: "hello", timestamp: 2000 },
    ];
    saveMessages(msgs);
    expect(loadMessages()).toEqual(msgs);
  });

  it("clears stored messages", () => {
    saveMessages([
      { id: "1", role: "user" as const, content: "hi", timestamp: 1000 },
    ]);
    clearMessages();
    expect(loadMessages()).toEqual([]);
  });

  it("handles corrupted JSON gracefully", () => {
    localStorage.setItem("ai_chat_history", "not-json{{{");
    expect(loadMessages()).toEqual([]);
  });
});
