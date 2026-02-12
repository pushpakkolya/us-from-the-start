import { useState } from "react";

export default function App() {
  const [started, setStarted] = useState(false);
  const [noCount, setNoCount] = useState(0);

  const handleNo = () => {
    setNoCount(noCount + 1);
  };

  if (started) {
    return (
      <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
        <h1>Welcome to Us From The Start ❤️</h1>
        <p>The journey begins...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h1>Are you ready?</h1>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setStarted(true)}
          style={{
            padding: "10px 20px",
            marginRight: "15px",
            fontSize: "16px",
          }}
        >
          Yes ❤️
        </button>

        <button
          onClick={handleNo}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
          }}
        >
          No 🥺
        </button>
      </div>

      {noCount > 0 && (
        <p style={{ marginTop: "20px", color: "gray" }}>
          {noCount < 10
            ? "That hurt a little... 🥺 Why no?"
            : "Okay now you're just being mean 😭 Please press Yes."}
        </p>
      )}
    </div>
  );
}
