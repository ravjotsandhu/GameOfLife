import "./Grid.css";
import { Box } from "./Box";
// import React, { useState, useEffect, useRef } from "react";
export const Grid = ({ grid, selectBox }) => {
  let rowsArr = [];
  let boxClass = "";
  // console.log(numRows, numCols);

  for (let i = 0; i <= grid.length - 1; i++) {
    rowsArr[i] = [];

    for (let j = 0; j <= grid[i].length - 1; j++) {
      let boxId = i + "_" + j;
      // console.log(grid[i][j]);
      boxClass = grid[i][j] ? "box on" : "box off";
      //pushing bunch of boxes onto array
      rowsArr[i].push(
        <Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={i}
          col={j}
          selectBox={selectBox}
        />
      );
    }
  }

  return (
    <div className="grid">
      {rowsArr.map((row, index) => (
        <div key={index} className="row">
          {row}
        </div>
      ))}
    </div>
  );
};
