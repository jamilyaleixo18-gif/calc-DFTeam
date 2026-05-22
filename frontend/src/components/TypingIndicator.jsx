import logo from "../img/logo.jpg";

export default function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          overflow: "hidden",
          marginRight: "10px",
          flexShrink: 0,
        }}
      >
        <img src={logo} alt="DF" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div
        style={{
          padding: "12px 18px",
          background: "#f0ebff",
          borderRadius: "18px 18px 18px 4px",
          border: "1px solid #ddd6fe",
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#9f6ff0",
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              display: "inline-block",
            }}
          />
        ))}
      </div>
    </div>
  );
}
