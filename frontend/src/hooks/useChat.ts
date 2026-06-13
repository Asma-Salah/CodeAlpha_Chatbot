import { useState } from "react";

// Define the Message type
type Message = {
  id: number;
  role: "user" | "bot";
  content: string;
};

function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      content:
        "Hi! 👋 I am your FAQ assistant. Ask me anything about our services.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  async function sendMessage(userInput: string) {
    // Step 1 — Add user message to chat immediately
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: userInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Step 2 — Send question to Flask backend
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userInput }),
      });

      const data = await response.json();

      // Step 3 — Add bot response to chat
      const botMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: data.answer,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      // Step 4 — Handle network error
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: "Sorry, I am having trouble connecting. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    sendMessage,
  };
}

export default useChat;
