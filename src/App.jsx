import { useState, useEffect } from "react";
import Landing from "./rooms/Landing";
import RoomOne from "./rooms/RoomOne";
import RoomTwo from "./rooms/RoomTwo";
import RoomThree from "./rooms/RoomThree";
import RoomFour from "./rooms/RoomFour";

function App() {
  const [room, setRoom] = useState(0);
  const [displayRoom, setDisplayRoom] = useState(0);
  const [fade, setFade] = useState(true);

  // Fade transition logic
  useEffect(() => {
    if (room !== displayRoom) {
      setFade(false);

      const timer = setTimeout(() => {
        setDisplayRoom(room);
        setFade(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [room, displayRoom]);

  // 🔐 Cheat code (press 0–4 to jump rooms)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "0") setRoom(0);
      if (e.key === "1") setRoom(1);
      if (e.key === "2") setRoom(2);
      if (e.key === "3") setRoom(3);
      if (e.key === "4") setRoom(4);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      style={{
        transition: "opacity 0.5s ease",
        opacity: fade ? 1 : 0,
      }}
    >
      {displayRoom === 0 && (
        <Landing onStart={() => setRoom(1)} />
      )}

      {displayRoom === 1 && (
        <RoomOne onComplete={() => setRoom(2)} />
      )}

      {displayRoom === 2 && (
        <RoomTwo onComplete={() => setRoom(3)} />
      )}

      {displayRoom === 3 && (
        <RoomThree onComplete={() => setRoom(4)} />
      )}

      {displayRoom === 4 && (
        <RoomFour onComplete={() => setRoom(5)} />
      )}
    </div>
  );
}

export default App;
