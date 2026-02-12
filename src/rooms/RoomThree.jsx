import { useEffect, useState } from "react";

export default function RoomThree({ onComplete }) {
  const size = 4; // 4x4 grid
  const tileSize = 100; // size of each piece in px
  const total = size * size;

  // solved order: 1..15 + null
  const solvedState = [
    ...Array(total - 1).keys()
  ].map(i => i + 1).concat(null);

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

  const indexToRowCol = (i) => [
    Math.floor(i / size),
    i % size
  ];

  const canMove = (i) => {
    const emptyIndex = tiles.indexOf(null);
    const [r1, c1] = indexToRowCol(i);
    const [r2, c2] = indexToRowCol(emptyIndex);

    return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
  };

  const moveTile = (i) => {
    if (!canMove(i) || completed) return;

    const emptyIndex = tiles.indexOf(null);
    const newTiles = [...tiles];
    [newTiles[i], newTiles[emptyIndex]] =
      [newTiles[emptyIndex], newTiles[i]];

    setTiles(newTiles);
  };

  useEffect(() => {
    if (JSON.stringify(tiles) === JSON.stringify(solvedState)) {
      setCompleted(true);

      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
    }
  }, [tiles]);

  return (
    <div style={styles.container}>
      <h2>🧩 Slide the Pieces to Complete the Picture</h2>

      <div
        style={{
          ...styles.grid,
          width: size * tileSize,
          height: size * tileSize,
        }}
      >
        {tiles.map((tile, index) => {
          if (tile === null) {
            return (
              <div
                key={index}
                style={{
                  width: tileSize,
                  height: tileSize,
                }}
              />
            );
          }

          const correctIndex = tile - 1;
          const x = correctIndex % size;
          const y = Math.floor(correctIndex / size);

          return (
            <div
              key={index}
              onClick={() => moveTile(index)}
              style={{
                width: tileSize,
                height: tileSize,
                backgroundImage: "url(/puzzle.jpg)",
                backgroundSize: `${size * tileSize}px ${size * tileSize}px`,
                backgroundPosition: `-${x * tileSize}px -${y * tileSize}px`,
                cursor: canMove(index) ? "pointer" : "default",
                borderRadius: "6px",
                transition: "all 0.2s ease",
              }}
            />
          );
        })}
      </div>

      {completed && (
        <p style={{ marginTop: "20px" }}>
          💖 Perfect… unlocking next room...
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #2b0036, #1a0033)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontFamily: "sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 100px)",
    gridTemplateRows: "repeat(4, 100px)",
    gap: "4px",
    marginTop: "20px",
  },
};
