import useChat from "./hooks/useChat";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";

function App() {
  const { messages, loading, sendMessage } = useChat();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "480px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          height: "580px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#0f3460",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{ fontSize: "28px" }}>🤖</div>
          <div>
            <h2
              style={{
                color: "white",
                fontSize: "16px",
                margin: 0,
                fontWeight: "600",
              }}
            >
              FAQ Assistant
            </h2>
            <p
              style={{
                color: "#a0c4ff",
                fontSize: "12px",
                margin: 0,
              }}
            >
              Ask me anything
            </p>
          </div>
          <div
            style={{
              marginLeft: "auto",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#48bb78",
            }}
          />
        </div>

        {/* Chat window */}
        <ChatWindow messages={messages} loading={loading} />

        {/* Input bar */}
        <InputBar onSend={sendMessage} loading={loading} />
      </div>

      {/* Footer */}
      <p
        style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.5)",
          fontSize: "12px",
          marginTop: "16px",
        }}
      >
        Powered by NLP — TF-IDF + Cosine Similarity
      </p>
    </div>
  );
}

export default App;
