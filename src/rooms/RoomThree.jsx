import { useEffect, useState } from "react";

export default function RoomThree({ onComplete }) {
  const size = 4;
  const total = size * size;

  const solvedState = [...Array(total - 1).keys()].map(i => i + 1).concat(null);

  const shuffle = () => {
    const arr = [...solvedState];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const [tiles, setTiles] = useState(shuffle());
  const [completed, setCompleted] = useState(false);

  const indexToRC = (i) => [Math.floor(i / size), i % size];

  const canMove = (i) => {
    const empty = tiles.indexOf(null);
    const [r1, c1] = indexToRC(i);
    const [r2, c2] = indexToRC(empty);
    return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
  };

  const moveTile = (i) => {
    if (!canMove(i) || completed) return;

    const empty = tiles.indexOf(null);
    const newTiles = [...tiles];
    [newTiles[i], newTiles[empty]] = [newTiles[empty], newTiles[i]];
    setTiles(newTiles);
  };

  useEffect(() => {
    if (JSON.stringify(tiles) === JSON.stringify(solvedState)) {
      setCompleted(true);
      setTimeout(() => {
        if (typeof onComplete === "function") onComplete();
      }, 1500);
    }
  }, [tiles]);

  return (
    <div style={styles.container}>
      <h2>🧩 Fix the Picture to Unlock</h2>

      <div style={styles.grid}>
        {tiles.map((tile, i) => {
          if (tile === null) {
            return <div key={i} style={styles.empty}></div>;
          }

          const correctIndex = tile - 1;
          const x = correctIndex % size;
          const y = Math.floor(correctIndex / size);

          return (
            <div
              key={i}
              onClick={() => moveTile(i)}
              style={{
                ...styles.tile,
                backgroundImage: `url("/puzzle.jpg")`,
                backgroundSize: `${size * 100}% ${size * 100}%`,
                backgroundPosition: `${(x / (size - 1)) * 100}% ${(y / (size - 1)) * 100}%`,
                cursor: canMove(i) ? "pointer" : "default",
              }}
            />
          );
        })}
      </div>

      {completed && <p style={styles.done}>💖 Perfect… unlocking...</p>}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #302b63)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 90px)",
    gridTemplateRows: "repeat(4, 90px)",
    gap: "4px",
    marginTop: "20px",
  },
  tile: {
    width: "90px",
    height: "90px",
    borderRadius: "6px",
    transition: "0.2s",
  },
  empty: {
    width: "90px",
    height: "90px",
  },
  done: {
    marginTop: "20px",
    fontSize: "20px",
  },
};
