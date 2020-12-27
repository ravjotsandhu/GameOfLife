import React, {useState} from "react";
import './App.css';
import ReactDOM from 'react-dom';


function Grid(){
  return(
    <div>Grid</div>
  );
}

function App() {
  const [generation]=useState(0);

  return(
    <div>
      <h1>Game Of Life</h1>
      <Grid/>
      <h2>Generations: {generation}</h2>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
