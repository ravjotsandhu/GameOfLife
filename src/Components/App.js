import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Buttons } from "./Buttons.jsx";
import { Grid } from "./Grid.jsx";

const App = () => {
  const [generation, setGeneration] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [numRows, setnumRows] = useState(30);
  const [numCols, setnumCols] = useState(50);
  const [isRunning, setIsRunning] = useState(true);

  const defaultGrid = Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => false)
  );

  useInterval(
    () => {
      //Custom logic
      Play();
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

  const [grid, setGrid] = useState(defaultGrid);

  const selectBox = (row, col) => {
    setGrid((prevGrid) => {
      prevGrid[row][col] = true;
      return prevGrid.map((row) => [...row]);
    });
  };
  const Seed = (row, col) => {
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
  };
  const PlayButton = () => {
    // const interval = setInterval(() => {
    //   Play();
    // }, delay);
    setIsRunning(true);
  };
  const Play = () => {
    setGrid((grid) => {
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
    setGeneration((generation) => generation + 1);
  };
  const PauseButton = () => {
    setIsRunning(false);
  };

  const Slow = () => {
    setDelay(1000);
    PlayButton();
  };

  const Fast = () => {
    setDelay(10);
    PlayButton();
  };

  const Clear = () => {
    setGrid(
      Array.from({ length: numRows }, () =>
        Array.from({ length: numCols }, () => false)
      )
    );
  };

  const gridSize = (size) => {
    switch (size) {
      case "1":
        setnumCols(20);
        setnumRows(10);
        break;
      case "2":
        setnumCols(50);
        setnumRows(30);
        break;
      case "3":
        setnumCols(70);
        setnumRows(50);
        break;
      default:
        break;
    }
    Clear();
  };
  useEffect(() => {
    Seed();
    PlayButton();
    // return () => {
    //   cleanup
    // }
  }, []);
  // const handleSelect = (evt) => {
  //   gridSize(evt);
  // };

  return (
    <div>
      <h1>Game Of Life</h1>
      <Buttons
        PlayButton={PlayButton}
        PauseButton={PauseButton}
        Slow={Slow}
        Fast={Fast}
        Clear={Clear}
        Seed={Seed}
        gridSize={gridSize}
      />
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
