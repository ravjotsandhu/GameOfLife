import './Box.css';
import {Grid} from './Grid';
export const Box = ({ row, col, boxClass, id, selectBox }) => {
  //  const selectmyBox = () => {
  //   selectBox(row, col);
  // };
  
  return <div 
          className={boxClass} 
          id={id} 
          onClick={() => selectBox(row, col)}
        />;
  };
  
  
  