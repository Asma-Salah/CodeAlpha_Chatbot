import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

type Message = {
  id: number;
  role: "user" | "bot";
  content: string;
};

type ChatWindowProps = {
  messages: Message[];
  loading: boolean;
};

function ChatWindow({ messages, loading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Render each message */}
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}

      {/* Typing indicator */}
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#0f3460",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            🤖
          </div>
          <div
            style={{
              backgroundColor: "#f0f4f8",
              padding: "12px 16px",
              borderRadius: "18px 18px 18px 4px",
              display: "flex",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <span style={dotStyle(0)}>●</span>
            <span style={dotStyle(0.2)}>●</span>
            <span style={dotStyle(0.4)}>●</span>
          </div>
        </div>
      )}

      {/* Invisible div at the bottom for auto scroll */}
      <div ref={bottomRef} />
    </div>
  );
}

// Animated typing dot style
function dotStyle(delay: number) {
  return {
    fontSize: "10px",
    color: "#a0aec0",
    animation: "bounce 1s infinite",
    animationDelay: `${delay}s`,
  };
}

export default ChatWindow;
