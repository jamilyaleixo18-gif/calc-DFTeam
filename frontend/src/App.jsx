import { useState, useRef, useEffect } from "react";
import Message from "./components/Message";
import TypingIndicator from "./components/TypingIndicator";
import { SUGGESTIONS, INITIAL_MESSAGE, BRAND, FONT_FAMILY, FONT_SIZE } from "./constants";
import logo from "./img/logo.jpg";

export default function NutritionChat() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      const reply = data?.reply || "Desculpe, não consegui processar sua mensagem.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Erro ao conectar. Tente novamente." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
        padding: "12px 20px 20px",
      }}
    >
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        textarea::placeholder { color: #a78bca; }
        textarea:focus { outline: none; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f5f0ff; }
        ::-webkit-scrollbar-thumb { background: #c4a0f5; border-radius: 3px; }
        .suggestion-btn:hover { background: #ede5ff !important; border-color: ${BRAND.primary} !important; color: ${BRAND.primaryDark} !important; }
        .send-btn:hover { transform: scale(1.05); }
        .send-btn:active { transform: scale(0.97); }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          height: "90vh",
          maxHeight: "780px",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #e0d0f8",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(106,63,171,0.12), 0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            background: BRAND.primary,
            borderBottom: `1px solid ${BRAND.primaryDark}`,
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              overflow: "hidden",
              background: BRAND.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "none",
              flexShrink: 0,
            }}
          >
            <img
              src={logo}
              alt="DF Muses"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML = `<span style="font-size:16px;font-weight:bold;color:${BRAND.primary}">DF</span>`;
              }}
            />
          </div>
          <div>
            <div style={{ color: "#ffffff", fontSize: FONT_SIZE.xl, fontWeight: "bold", letterSpacing: "0.3px" }}>
              DF Muses
            </div>
            <div style={{ color: "#ddd6fe", fontSize: FONT_SIZE.sm, marginTop: "2px" }}>
              Sugestões de pratos e substituições
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 6px", background: "#fdfbff" }}>
          {messages.map((msg, i) => (
            <Message key={i} msg={msg} />
          ))}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions */}
        {messages.length <= 1 && (
          <div
            style={{
              padding: "0 20px 12px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              background: "#fdfbff",
            }}
          >
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                className="suggestion-btn"
                onClick={() => sendMessage(s)}
                style={{
                  padding: "6px 12px",
                  background: "#f5f0ff",
                  border: "1px solid #ddd6fe",
                  borderRadius: "20px",
                  color: BRAND.primary,
                  fontSize: FONT_SIZE.sm,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div
          style={{
            padding: "16px 20px",
            borderTop: "1px solid #e0d0f8",
            background: "#ffffff",
            display: "flex",
            gap: "10px",
            alignItems: "flex-end",
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite ingredientes ou um alimento para substituir..."
            rows={1}
            style={{
              flex: 1,
              background: "#f5f0ff",
              border: "1px solid #ddd6fe",
              borderRadius: "12px",
              padding: "12px 14px",
              color: "#1a0a2e",
              fontSize: FONT_SIZE.base,
              fontFamily: "inherit",
              resize: "none",
              lineHeight: "1.5",
              maxHeight: "120px",
              overflowY: "auto",
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
          />
          <button
            className="send-btn"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background:
                loading || !input.trim()
                  ? "#e0d0f8"
                  : `linear-gradient(135deg, ${BRAND.primaryLight}, ${BRAND.primary})`,
              border: "none",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              flexShrink: 0,
              boxShadow:
                loading || !input.trim()
                  ? "none"
                  : "0 4px 14px rgba(106,63,171,0.4)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke={loading || !input.trim() ? "#a78bca" : "#fff"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
