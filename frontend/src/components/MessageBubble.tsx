type MessageBubbleProps = {
  role: "user" | "bot";
  content: string;
};

function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "12px",
      }}
    >
      {/* Bot avatar */}
      {!isUser && (
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
            marginRight: "8px",
            flexShrink: 0,
          }}
        >
          🤖
        </div>
      )}

      {/* Message bubble */}
      <div
        style={{
          maxWidth: "75%",
          padding: "12px 16px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          backgroundColor: isUser ? "#0f3460" : "#f0f4f8",
          color: isUser ? "white" : "#2d3748",
          fontSize: "15px",
          lineHeight: "1.5",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        {content}
      </div>

      {/* User avatar */}
      {isUser && (
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#667eea",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            marginLeft: "8px",
            flexShrink: 0,
          }}
        >
          👤
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
