import { useState, useEffect } from "react";
import Landing from "./rooms/Landing";
import RoomOne from "./rooms/RoomOne";
import RoomTwo from "./rooms/RoomTwo";
import RoomThree from "./rooms/RoomThree";

function App() {
  const [room, setRoom] = useState(0);
  const [displayRoom, setDisplayRoom] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (room !== displayRoom) {
      setFade(false); // fade out

      const timer = setTimeout(() => {
        setDisplayRoom(room); // switch room
        setFade(true); // fade in
      }, 500); // must match transition time

      return () => clearTimeout(timer);
    }
  }, [room, displayRoom]);

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
    </div>
  );
}

export default App;
