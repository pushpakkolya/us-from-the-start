import { useState, useEffect } from "react";
import RoomOne from ".rooms/RoomOne";
import RoomTwo from ".rooms/RoomTwo";

function App() {
  const [room, setRoom] = useState(1);

  useEffect(() => {
    const audio = document.getElementById("bg-music");

    const startMusic = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.log("Autoplay blocked");
      }
    };

    document.addEventListener("click", startMusic, { once: true });

    return () => {
      document.removeEventListener("click", startMusic);
    };
  }, []);

  return (
    <>
      {room === 1 && <RoomOne goNext={() => setRoom(2)} />}
      {room === 2 && <RoomTwo goNext={() => setRoom(3)} />}
    </>
  );
}

export default App;
