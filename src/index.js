import React, {useState} from "react";
import './App.css';
import ReactDOM from 'react-dom';

const Box = ({ row,col,boxClass,id,selectBox }) =>{
	selectBox = () => {
	  selectBox(row, col);
	}

	return (
    <div
      className={boxClass}
      id={id}
      onClick={selectBox}
    />
  );
}

const Grid = ({ numRows,numCols,gridFull,selectBox }) => {
  const width = numCols * 16;
  var rowsArr = [];
  var boxClass = "";

  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numCols; j++) {
      let boxId = i + "_" + j;

      boxClass = gridFull[i][j] ? "box on" : "box off";
      rowsArr.push(
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
    <div className="grid" style={{width: width}}>
      {rowsArr}
    </div>
  );
}

const App = () => {
  const numRows = 50;
  const numCols = 30;
  
  const [generation, gridFull] = useState(() => {
    const grid = Array.from({length: numRows}, () => Array.from({length: numCols}, () => 0));
    return grid;
  });

  return(
    <div>
      <h1>Game Of Life</h1>
      <Grid
        gridFull={generation}
        numRows={numRows} numCols={numCols} 
      />
      <h2>Generations: {generation}</h2>
    </div>
  );
}

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById("root"));
