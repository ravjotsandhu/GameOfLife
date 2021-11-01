import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Buttons } from "./Buttons.jsx";
import { Grid } from "./Grid.jsx";

const App = () => {
  const [generation, setGeneration] = useState(0);
  const [delay, setDelay] = useState(1000);
  // const [grid.length, setnumRows] = useState(30);
  // const [grid[i].length, setnumCols] = useState(50);
  // const [dimesion,setDimension] = useState({grid.length,grid[i].length:50})
  const [isRunning, setIsRunning] = useState(true);

  const defaultGrid = Array.from({ length: 30 }, () =>
    Array.from({ length: 30 }, () => false)
  );
  const [grid, setGrid] = useState(defaultGrid);

  useInterval(
    () => {
      //Custom logic
      play();
      // seed();
    },
    isRunning ? delay : null
  );

  // function handleDelayChange(e) {
  //   setDelay(Number(e.target.value));
  // }

  // function handleIsRunningChange(e) {
  //   setIsRunning(e.target.checked);
  // }
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const selectBox = (row, col) => {
    setGrid((prevGrid) => {
      prevGrid[row][col] = true;
      return prevGrid.map((row) => [...row]);
    });
  };
  const seed = (grid) => {
    console.log(grid)
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        console.log(grid.length,grid[i].length)
        if (Math.floor(Math.random() * 4) === 1) {
          setGrid((prevGrid) => {
            console.log(prevGrid,i,j)
            prevGrid[i][j] = true;
            return prevGrid.map((i) => [...i]);
          });
        }
      }
    }
  };

  const playButton = () => {
    // const interval = setInterval(() => {
    //   play();
    // }, delay);
    setIsRunning(true);
  };
  useEffect(() => {
    seed(grid);
    playButton();
    // return () => {
    //   cleanup  `
    // }
  }, []);
  const play = () => {
    // seed();
    setGrid((grid) => {
      let g2 = [...grid];

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          let count = 0;
          if (i > 0) if (grid[i - 1][j]) count++;
          if (i > 0 && j > 0) if (grid[i - 1][j - 1]) count++;
          if (i > 0 && j < grid[i].length - 1) if (grid[i - 1][j + 1]) count++;
          if (j < grid[i].length - 1) if (grid[i][j + 1]) count++;
          if (j > 0) if (grid[i][j - 1]) count++;
          if (i < grid.length - 1) if (grid[i + 1][j]) count++;
          if (i < grid.length - 1 && j > 0) if (grid[i + 1][j - 1]) count++;
          if (i < grid.length - 1 && grid[i].length - 1)
          if (grid[i + 1][j + 1]) count++;
          if (grid[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
          if (!grid[i][j] && count === 3) g2[i][j] = true;
        }
      }
      return g2;
    });
    setGeneration((generation) => generation + 1);
  };
  const pauseButton = () => {
    setIsRunning(false);
  };

  const slow = () => {
    setDelay(1000);
    playButton();
  };

  const fast = () => {
    setDelay(10);
    playButton();
  };

  const clear = (rows,cols) => {
    console.log(rows,cols)
    // setnumCols(cols);
    // setnumRows(rows);
    // console.log(grid.length, grid[i].length);
    const newGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => false)
    );
    setGrid(newGrid);
    seed(newGrid);
    setGeneration(0);
  };

  const gridSize = (size) => {
    switch (size) {
      case "1":
        clear(10,20) ;
        break;
      case "2":
        clear(20,30);
        break;
      case "3":
        clear(30,40) ;
        break;
      default:
        break;
    }
  };

  // const handleSelect = (evt) => {
  //   gridSize(evt);
  // };

  return (
    <div>
      <h1>Game Of Life</h1>
      <Buttons
        playButton={playButton}
        pauseButton={pauseButton}
        slow={slow}
        fast={fast}
        clear={clear}
        seed={seed}
        gridSize={gridSize}
      />
      <Grid grid={grid} selectBox={selectBox} />
      <h2>Generations: {generation}</h2>
    </div>
  );
};

export default App;
