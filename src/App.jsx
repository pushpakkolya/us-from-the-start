import { useState, useRef, useEffect } from "react";
import RoomOne from "./RoomOne";
import RoomTwo from "./RoomTwo";

function App() {
  const [room, setRoom] = useState(1);
  const audioRef = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.5;

    const startMusic = async () => {
      if (hasStarted.current) return;

      try {
        await audio.play();
        hasStarted.current = true;
      } catch (err) {
        console.log("Autoplay blocked");
      }
    };

    document.addEventListener("click", startMusic);

    return () => {
      document.removeEventListener("click", startMusic);
    };
  }, []);

  return (
    <>
      {/* GLOBAL MUSIC */}
      <audio ref={audioRef}>
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      {room === 1 && <RoomOne goNext={() => setRoom(2)} />}
      {room === 2 && <RoomTwo goNext={() => setRoom(3)} />}
    </>
  );
}

export default App;
