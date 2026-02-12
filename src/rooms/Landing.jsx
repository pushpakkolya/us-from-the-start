export default function Landing({ onStart }) {
  const startExperience = () => {
    const audio = document.getElementById("bg-music");
    if (audio) {
      audio.play().catch(() => {});
    }

    if (typeof onStart === "function") {
      onStart();
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "serif",
        textAlign: "center",
      }}
    >
      <h1>From The Very Beginning</h1>
      <button
        type="button"
        onClick={startExperience}
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Enter ❤️
      </button>
    </div>
  );
}
