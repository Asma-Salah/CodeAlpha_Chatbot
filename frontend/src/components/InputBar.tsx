import { useState } from "react";

type InputBarProps = {
  onSend: (message: string) => void;
  loading: boolean;
};

function InputBar({ onSend, loading }: InputBarProps) {
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim() || loading) return;
    onSend(input.trim());
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      style={{
        padding: "16px 20px",
        borderTop: "1px solid #e2e8f0",
        backgroundColor: "white",
        display: "flex",
        gap: "12px",
        alignItems: "center",
      }}
    >
      {/* Text input */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your question here..."
        disabled={loading}
        style={{
          flex: 1,
          padding: "12px 16px",
          fontSize: "15px",
          fontFamily: "Inter, sans-serif",
          border: "2px solid #e2e8f0",
          borderRadius: "25px",
          outline: "none",
          backgroundColor: loading ? "#f7fafc" : "white",
          color: "#2d3748",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#0f3460")}
        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
      />

      {/* Send button */}
      <button
        onClick={handleSend}
        disabled={loading || !input.trim()}
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: loading || !input.trim() ? "#e2e8f0" : "#0f3460",
          color: "white",
          fontSize: "18px",
          cursor: loading || !input.trim() ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background-color 0.2s ease",
        }}
      >
        {loading ? "⏳" : "➤"}
      </button>
    </div>
  );
}

export default InputBar;
