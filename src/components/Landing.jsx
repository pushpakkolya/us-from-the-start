import { useState } from "react";

export default function Landing({ onStart }) {
  const [noCount, setNoCount] = useState(0);

  const handleNo = () => {
    setNoCount((prev) => prev + 1);
  };

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
          onClick={() => {
            if (typeof onStart === "function") {
              onStart();
            }
          }}
          style={{ padding: "10px 20px", marginRight: "15px" }}
        >
          Yes ❤️
        </button>

        <button
          onClick={handleNo}
          style={{ padding: "10px 20px" }}
        >
          No 🥺
        </button>
      </div>

      {noCount > 0 && (
        <p style={{ marginTop: "20px", color: "gray" }}>
          {noCount < 10
            ? "That hurt a little... 🥺"
            : "Okay now you're just being mean 😭 Please press Yes."}
        </p>
      )}
    </div>
  );
}
