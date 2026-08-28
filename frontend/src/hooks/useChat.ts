"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Message, sendChatMessage } from "@/utils/api";
import { generateId } from "@/utils/helpers";
import { clearMessages, loadMessages, saveMessages } from "@/utils/storage";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setMessages(loadMessages());
  }, []);

  // Persist whenever messages change
  useEffect(() => {
    if (messages.length > 0) saveMessages(messages);
  }, [messages]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const send = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isLoading) return;

      setError(null);

      const userMsg: Message = {
        id: generateId(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        // Send full conversation context for multi-turn
        const history = [...messages, userMsg].map(({ role, content }) => ({
          role,
          content,
        }));

        const data = await sendChatMessage(history);

        const assistantMsg: Message = {
          id: generateId(),
          role: "assistant",
          content: data.reply,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Something went wrong.";
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const reset = useCallback(() => {
    setMessages([]);
    setError(null);
    clearMessages();
  }, []);

  const dismissError = useCallback(() => setError(null), []);

  return {
    messages,
    isLoading,
    error,
    send,
    reset,
    dismissError,
    bottomRef,
  };
}
