import React, { useEffect, useRef, useState } from "react";

const cellSize = 60;
const rows = 7;
const cols = 7;

const directions = {
  ArrowUp: { dx: 0, dy: -1 },
  ArrowDown: { dx: 0, dy: 1 },
  ArrowLeft: { dx: -1, dy: 0 },
  ArrowRight: { dx: 1, dy: 0 },
};

function generateMaze(rows, cols) {
  const maze = Array.from({ length: rows }, () => Array(cols).fill(1));
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  function carve(x, y) {
    visited[y][x] = true;
    maze[y][x] = 0;

    const dirs = shuffle([
      [0, -2],
      [0, 2],
      [-2, 0],
      [2, 0],
    ]);

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        ny > 0 &&
        ny < rows - 1 &&
        nx > 0 &&
        nx < cols - 1 &&
        !visited[ny][nx]
      ) {
        maze[y + dy / 2][x + dx / 2] = 0;
        carve(nx, ny);
      }
    }
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  carve(1, 1);
  maze[1][1] = 0; // Start
  maze[5][5] = 2; // Goal
  return maze;
}

export default function MinimalistMaze() {
  const canvasRef = useRef(null);
  const [maze, setMaze] = useState([]);
  const [player, setPlayer] = useState({ x: 1, y: 1 });
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(30);

  useEffect(() => {
    setMaze(generateMaze(rows, cols));
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || maze.length === 0) return;

    ctx.clearRect(0, 0, cellSize * cols, cellSize * rows);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const value = maze[y][x];
        if (value === 1) ctx.fillStyle = "#e0e0e0"; // light gray wall
        else if (value === 2) ctx.fillStyle = "#a4e9a7"; // soft green goal
        else ctx.fillStyle = "#ffffff"; // path

        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        // No border for minimalist design
      }
    }

    // Draw player
    ctx.fillStyle = "#1976d2"; // soft blue
    ctx.beginPath();
    ctx.arc(
      player.x * cellSize + cellSize / 2,
      player.y * cellSize + cellSize / 2,
      cellSize / 3,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }, [maze, player]);

  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver) return;

      const dir = directions[e.key];
      if (!dir) return;

      const newX = player.x + dir.dx;
      const newY = player.y + dir.dy;

      const cell = maze[newY]?.[newX];
      if (cell === 0 || cell === 2) {
        setPlayer({ x: newX, y: newY });
        if (cell === 2) setGameOver(true);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [player, maze, gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver]);

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", padding: "20px" }}>
      <canvas
        ref={canvasRef}
        width={cellSize * cols}
        height={cellSize * rows}
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "16px",
          display: "block",
          margin: "auto",
        }}
      />
      <div style={{ fontSize: "16px", color: "#333" }}>⏱️ Time left: {time}s</div>
      {gameOver && (
        <div style={{ color: "#388e3c", fontSize: "20px", marginTop: "10px" }}>
          ✅ You reached the goal!
        </div>
      )}
      {time === 0 && !gameOver && (
        <div style={{ color: "#d32f2f", fontSize: "20px", marginTop: "10px" }}>
          ❌ Time’s up!
        </div>
      )}
    </div>
  );
}



















//import React, { useRef, useEffect } from "react";

//const GameCanvas = () => {
  //const canvasRef = useRef(null);

  //useEffect(() => {
   // const canvas = canvasRef.current;
    //const ctx = canvas.getContext("2d");

    // Simple static maze box
    //ctx.fillStyle = "#222";
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = "#fff";
    //ctx.fillRect(10, 10, 380, 380); // Maze bounds

    // Player dot
   // ctx.fillStyle = "red";
    //ctx.beginPath();
   // ctx.arc(30, 30, 10, 0, 2 * Math.PI);
    //ctx.fill();
  //}, []);

 // return (
    //<canvas
    //  ref={canvasRef}
      //width={400}
      //height={400}
      //style={{ border: "2px solid #000", margin: "20px" }}
    //>
  //);
//};

//export default GameCanvas;
// import React, { useRef, useEffect, useState } from "react";

// const cellSize = 40;
// const maze = [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
//   [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
//   [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
//   [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
//   [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
//   [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
//   [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
//   [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// ];

// const GameCanvas = ({ onSuccess }) => {
//   const canvasRef = useRef(null);
//   const [player, setPlayer] = useState({ x: 1, y: 1 });
//   const [gameOver, setGameOver] = useState(false);
//   const [time, setTime] = useState(0);

//   // Drawing logic
//   const draw = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw maze
//     for (let y = 0; y < maze.length; y++) {
//       for (let x = 0; x < maze[y].length; x++) {
//         ctx.fillStyle = maze[y][x] === 1 ? "#000" : "#fff";
//         ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
//       }
//     }

//     // Draw goal
//     ctx.fillStyle = "green";
//     ctx.fillRect(8 * cellSize + 10, 8 * cellSize + 10, 20, 20);

//     // Draw player
//     ctx.fillStyle = "red";
//     ctx.beginPath();
//     ctx.arc(
//       player.x * cellSize + cellSize / 2,
//       player.y * cellSize + cellSize / 2,
//       10,
//       0,
//       2 * Math.PI
//     );
//     ctx.fill();
//   };

//   // Player movement
//   const handleKeyDown = (e) => {
//     if (gameOver) return;

//     const directions = {
//       ArrowUp: { dx: 0, dy: -1 },
//       ArrowDown: { dx: 0, dy: 1 },
//       ArrowLeft: { dx: -1, dy: 0 },
//       ArrowRight: { dx: 1, dy: 0 },
//     };

//     const dir = directions[e.key];
//     if (!dir) return;

//     const newX = player.x + dir.dx;
//     const newY = player.y + dir.dy;

//     if (maze[newY]?.[newX] === 0) {
//       setPlayer({ x: newX, y: newY });

//       if (newX === 8 && newY === 8) {
//         setGameOver(true);
//         if (onSuccess) onSuccess();
//       }
//     }
//   };

//   useEffect(() => {
//     draw();
//   }, [player]);

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     const interval = setInterval(() => setTime((t) => t + 1), 1000);

//     draw();

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div>
//       <canvas
//         ref={canvasRef}
//         width={cellSize * 10}
//         height={cellSize * 10}
//         style={{ border: "2px solid black", margin: "20px" }}
//       />
//       <div style={{ fontSize: "18px", marginLeft: "20px" }}>
//         ⏱️ Time: {time}s
//       </div>
//       {gameOver && (
//         <div style={{ color: "green", fontSize: "24px", marginTop: "10px" }}>
//           ✅ CAPTCHA Passed! You reached the goal!
//         </div>
//       )}
//     </div>
//   );
// };

// export default GameCanvas;




// 



// import React, { useRef, useEffect, useState } from "react";

// const cellSize = 40;
// const rows = 21; // should be odd for proper maze generation
// const cols = 21;

// const directions = {
//   ArrowUp: { dx: 0, dy: -1 },
//   ArrowDown: { dx: 0, dy: 1 },
//   ArrowLeft: { dx: -1, dy: 0 },
//   ArrowRight: { dx: 1, dy: 0 },
// };

// function generateMaze(rows, cols) {
//   const maze = Array.from({ length: rows }, () => Array(cols).fill(1)); // all walls
//   const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

//   function shuffle(arr) {
//     for (let i = arr.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//     return arr;
//   }

//   function carve(x, y) {
//     visited[y][x] = true;
//     maze[y][x] = 0;
//     const dirs = shuffle([
//       [0, -2],
//       [0, 2],
//       [-2, 0],
//       [2, 0],
//     ]);

//     for (const [dx, dy] of dirs) {
//       const nx = x + dx;
//       const ny = y + dy;
//       if (
//         ny > 0 &&
//         ny < rows - 1 &&
//         nx > 0 &&
//         nx < cols - 1 &&
//         !visited[ny][nx]
//       ) {
//         maze[y + dy / 2][x + dx / 2] = 0; // carve wall between
//         carve(nx, ny);
//       }
//     }
//   }

//   carve(1, 1);

//   // Start and goal
//   maze[1][1] = 0;
//   maze[rows - 2][cols - 2] = 2; // goal
//   return maze;
// }

// export default function MazeGame() {
//   const canvasRef = useRef(null);
//   const [maze, setMaze] = useState([]);
//   const [player, setPlayer] = useState({ x: 1, y: 1 });
//   const [gameOver, setGameOver] = useState(false);
//   const [gameLost, setGameLost] = useState(false);
//   const [time, setTime] = useState(60); // 1 min

//   useEffect(() => {
//     const newMaze = generateMaze(rows, cols);
//     setMaze(newMaze);
//   }, []);

//   useEffect(() => {
//     const ctx = canvasRef.current?.getContext("2d");
//     if (!ctx || maze.length === 0) return;

//     ctx.clearRect(0, 0, cellSize * cols, cellSize * rows);

//     for (let y = 0; y < rows; y++) {
//       for (let x = 0; x < cols; x++) {
//         if (maze[y][x] === 1) ctx.fillStyle = "black";
//         else if (maze[y][x] === 2) ctx.fillStyle = "green";
//         else ctx.fillStyle = "white";

//         ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
//         ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
//       }
//     }

//     ctx.fillStyle = "blue";
//     ctx.beginPath();
//     ctx.arc(
//       player.x * cellSize + cellSize / 2,
//       player.y * cellSize + cellSize / 2,
//       cellSize / 3,
//       0,
//       2 * Math.PI
//     );
//     ctx.fill();
//   }, [maze, player]);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (gameOver || gameLost) return;

//       const dir = directions[e.key];
//       if (!dir) return;

//       const newX = player.x + dir.dx;
//       const newY = player.y + dir.dy;

//       const cell = maze[newY]?.[newX];

//       if (cell === 0 || cell === 2) {
//         setPlayer({ x: newX, y: newY });
//         if (cell === 2) setGameOver(true);
//       }
//     };

//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [maze, player, gameOver, gameLost]);

//   useEffect(() => {
//     if (gameOver || gameLost) return;
//     const interval = setInterval(() => {
//       setTime((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setGameLost(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [gameOver, gameLost]);

//   return (
//     <div>
//       <canvas
//         ref={canvasRef}
//         width={cellSize * cols}
//         height={cellSize * rows}
//         style={{ border: "2px solid black", margin: "20px" }}
//       />
//       <div style={{ fontSize: "18px" }}>⏱️ Time: {time}s</div>
//       {gameOver && (
//         <div style={{ color: "green", fontSize: "24px", marginTop: "10px" }}>
//           ✅ You reached the goal!
//         </div>
//       )}
//       {gameLost && (
//         <div style={{ color: "red", fontSize: "24px", marginTop: "10px" }}>
//           ❌ Time's up! Try again.
//         </div>
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useRef, useState } from "react";

// const cellSize = 60;
// const rows = 7;
// const cols = 7;

// const directions = {
//   ArrowUp: { dx: 0, dy: -1 },
//   ArrowDown: { dx: 0, dy: 1 },
//   ArrowLeft: { dx: -1, dy: 0 },
//   ArrowRight: { dx: 1, dy: 0 },
// };

// function generateMaze(rows, cols) {
//   const maze = Array.from({ length: rows }, () => Array(cols).fill(1)); // All walls
//   const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

//   function carve(x, y) {
//     visited[y][x] = true;
//     maze[y][x] = 0;

//     const directions = shuffle([
//       [0, -2],
//       [0, 2],
//       [-2, 0],
//       [2, 0],
//     ]);

//     for (const [dx, dy] of directions) {
//       const nx = x + dx;
//       const ny = y + dy;

//       if (
//         ny > 0 &&
//         ny < rows - 1 &&
//         nx > 0 &&
//         nx < cols - 1 &&
//         !visited[ny][nx]
//       ) {
//         maze[y + dy / 2][x + dx / 2] = 0;
//         carve(nx, ny);
//       }
//     }
//   }

//   function shuffle(array) {
//     return array.sort(() => Math.random() - 0.5);
//   }

//   carve(1, 1);
//   maze[1][1] = 0; // start
//   maze[5][5] = 2; // goal

//   return maze;
// }

// export default function MazeGame7x7() {
//   const canvasRef = useRef(null);
//   const [maze, setMaze] = useState([]);
//   const [player, setPlayer] = useState({ x: 1, y: 1 });
//   const [gameOver, setGameOver] = useState(false);
//   const [time, setTime] = useState(30);

//   useEffect(() => {
//     setMaze(generateMaze(rows, cols));
//   }, []);

//   useEffect(() => {
//     const ctx = canvasRef.current?.getContext("2d");
//     if (!ctx || maze.length === 0) return;

//     ctx.clearRect(0, 0, cellSize * cols, cellSize * rows);

//     for (let y = 0; y < rows; y++) {
//       for (let x = 0; x < cols; x++) {
//         const value = maze[y][x];
//         if (value === 1) ctx.fillStyle = "black";
//         else if (value === 2) ctx.fillStyle = "green";
//         else ctx.fillStyle = "white";

//         ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
//         ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
//       }
//     }

//     // Draw player
//     ctx.fillStyle = "blue";
//     ctx.beginPath();
//     ctx.arc(
//       player.x * cellSize + cellSize / 2,
//       player.y * cellSize + cellSize / 2,
//       cellSize / 3,
//       0,
//       2 * Math.PI
//     );
//     ctx.fill();
//   }, [maze, player]);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (gameOver) return;

//       const dir = directions[e.key];
//       if (!dir) return;

//       const newX = player.x + dir.dx;
//       const newY = player.y + dir.dy;

//       const cell = maze[newY]?.[newX];

//       if (cell === 0 || cell === 2) {
//         setPlayer({ x: newX, y: newY });
//         if (cell === 2) setGameOver(true);
//       }
//     };

//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [player, maze, gameOver]);

//   useEffect(() => {
//     if (gameOver) return;
//     const interval = setInterval(() => {
//       setTime((t) => {
//         if (t <= 1) {
//           clearInterval(interval);
//           return 0;
//         }
//         return t - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [gameOver]);

//   return (
//     <div>
//       <canvas
//         ref={canvasRef}
//         width={cellSize * cols}
//         height={cellSize * rows}
//         style={{ border: "2px solid black", marginBottom: "10px" }}
//       />
//       <div style={{ fontSize: "16px" }}>⏱️ Time: {time}s</div>
//       {gameOver && (
//         <div style={{ color: "green", fontSize: "22px", marginTop: "10px" }}>
//           ✅ You reached the goal!
//         </div>
//       )}
//       {time === 0 && !gameOver && (
//         <div style={{ color: "red", fontSize: "22px", marginTop: "10px" }}>
//           ❌ Time’s up!
//         </div>
//       )}
//     </div>
//   );
// }



