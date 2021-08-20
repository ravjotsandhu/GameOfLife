import "./Grid.css";
import { Box } from "./Box";
export const Grid = ({ numRows, numCols, setGrid, selectBox }) => {
  const boxes = setGrid.map((row, rowIndex) =>
    row.map((col, colIndex) => {
      return (
        <Box
          id={`${rowIndex}_${colIndex}`}
          key={`${rowIndex}_${colIndex}`}
          boxClass={`box ${col ? "on" : "off"}`}
          row={rowIndex}
          col={colIndex}
          selectBox={selectBox}
        />
      );
    })
  );

  // const width = numCols;
  // var rowsArr = [];
  // var boxClass = "";

  // for (var i = 0; i < numRows; i++) {
  //   rowsArr[i] = [];

  //   for (var j = 0; j < numCols; j++) {
  //     let boxId = i + "_" + j;

  //     boxClass = setGrid[i][j] ? "box on" : "box off";
  //     //pushing bunch of boxes onto array
  //     rowsArr[i].push(
  //       <Box
  //         boxClass={boxClass}
  //         key={boxId}
  //         boxId={boxId}
  //         row={i}
  //         col={j}
  //         selectBox={selectBox}
  //       />
  //     );
  //   }
  // }

  return (
    <div className="grid">
      {boxes.map((row, index) => (
        <div key={`row_${index}`} className="row">
          {row}
        </div>
      ))}
    </div>
  );
};
