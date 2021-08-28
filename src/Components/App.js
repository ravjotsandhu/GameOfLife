// import React, { useState, useCallback, useRef } from "react";
// import ReactDOM from "react-dom";
// import produce from "immer";
// const numRows = 50;
// const numCols = 50;
// const operations = [
//     [0, 1],
//     [0, -1],
//     [1, -1],
//     [-1, 1],
//     [1, 1],
//     [-1, -1],
//     [1, 0],
//     [-1, 0]
// ];
// const generateEmptyGrid = () => {
//     const numRows = [];
//     for (let i = 0; i < numRows; i++) {
//         numRows.push(Array.from(Array(numCols), () => 0));
//     }
//     return numRows;
// };
// function App(){
//     const [grid, setGrid] = useState(() => {
//         return generateEmptyGrid();
//     });
//     const [running, setRunning] = useState(false);
//     const runningRef = useRef(running);
//     runningRef.current = running;
//     const runSimulation = useCallback(() => {
//         if (!runningRef.current) {
//             return;
//         }
//         setGrid(g => {
//             return produce=(g, gridCopy) => {
//                 for (let i = 0; i < numRows; i++) {
//                     for (let k = 0; k < numCols; k++) {
//                         let neighbors = 0;
//                         operations.forEach(([x, y]) => {
//                             const newI = i + x;
//                             const newK = k + y;
//                             if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
//                                 neighbors += g[newI][newK];
//                             }
//                         });
//                         if (neighbors < 2 || neighbors > 3) {
//                             gridCopy[i][k] = 0;
//                         }
//                         else if (g[i][k] === 0 && neighbors === 3) {
//                             gridCopy[i][k] = 1;
//                         }
//                     }
//                 }
//             };
//         };
//         setTimeout(runSimulation, 100);
//     }, []);
//     return (
//       <div>
//         <button onClick={() => {
//           setRunning(!running);
//           if (!running) {
//             runningRef.current = true;
//             runSimulation();
//           }
//         }} > {running ? "stop" : "start"}</button>

//         <button onClick={() => {
//           const numRows = [];
//           for (let i = 0; i < numRows; i++) {
//             numRows.push(
//               Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
//             );
//           }
//           setGrid(numRows);
//         }}>
//             random
//         </button>
        
//         <button onClick={() => {
//           setGrid(generateEmptyGrid());
//         }}>
//             clear
//         </button>

//         <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: `repeat(${numCols}, 20px)`
//         }}>
//             {grid.map((numRows, i) =>
//             numRows.map((col, k) => (
//                 <div
//                 key={`${i}-${k}`}
//                 onClick={() => {
//                     const newGrid = produce(grid, gridCopy => {
//                     gridCopy[i][k] = grid[i][k] ? 0 : 1;
//                     });
//                     setGrid(newGrid);
//                 }}
//                 style={{
//                     width: 20,
//                     height: 20,
//                     backgroundColor: grid[i][k] ? "pink" : undefined,
//                     border: "solid 1px black"
//                 }}
//                 />
//             ))
//         )}
//         </div>

//       </div>
//     );
// };
// ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById("root"));
import React, { useState, useEffect } from "react";
import "./App.css";
import { Grid } from "./Grid.jsx";
const App = () => {
  const [generation, setGeneration] = useState(0);
  const speed = 100;
  const numRows = 30;
  const numCols = 50;

  const defaultGrid = Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => false)
  );

  const [grid, setGrid] = useState(defaultGrid);

  const selectBox = (row, col) => {
    setGrid((prevGrid) => {
      prevGrid[row][col] = true;
      return prevGrid.map((row) => [...row]);
    });
  };
const Seed = (row, col) => {
  // const [seed, setSeed] = useState(false);
  // const handleSeed = () => {
  //   setSeed(!seed);
  // };
  for (let i = 0; i < numRows; i++) {
			for (let j = 0; j < numCols; j++) {
				if (Math.floor(Math.random() * 4) === 1) {
					setGrid((prevGrid) => {
            prevGrid[i][j] = true;
            return prevGrid.map((i) => [...i]);
          });
				}
			}
		}
  //   setGrid((prevGrid) =>
  //   prevGrid.map((thing) =>
  //     thing.map(
  //       (prevVal) => Boolean(Math.floor(Math.random() * 4) === 1) || prevVal
  //     )
  //   )
  // );
    // return (
  //   <div>
  //     <button onClick={handleSeed}>{seed ? "stop" : "start"}</button>
  //   </div>
  // );
 }
 const playButton = () => {
  const interval = setInterval(() => {
    play();
  }, speed);
};
const play = () => {
  setGrid(grid => {
    var g2 = [...grid];

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let count = 0;
        if (i > 0) if (grid[i - 1][j]) count++;
        if (i > 0 && j > 0) if (grid[i - 1][j - 1]) count++;
        if (i > 0 && j < numCols - 1) if (grid[i - 1][j + 1]) count++;
        if (j < numCols - 1) if (grid[i][j + 1]) count++;
        if (j > 0) if (grid[i][j - 1]) count++;
        if (i < numRows - 1) if (grid[i + 1][j]) count++;
        if (i < numRows - 1 && j > 0) if (grid[i + 1][j - 1]) count++;
        if (i < numRows - 1 && numCols - 1) if (grid[i + 1][j + 1]) count++;
        if (grid[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!grid[i][j] && count === 3) g2[i][j] = true;
      }
    }
return g2;
});
setGeneration(generation => generation + 1)
};
useEffect(() => {
  Seed();
  playButton();
  // return () => {
  //   cleanup
  // }
}, []);


  return (
    <div>
      <h1>Game Of Life</h1>
      <Grid
        setGrid={grid}
        numRows={numRows}
        numCols={numCols}
        selectBox={selectBox}
      />
      <h2>Generations: {generation}</h2>
    </div>
  );
};

export default App;
