import React from "react";
import './Buttons.css';
import {
  ButtonToolbar,
  Dropdown,
  Button,
  DropdownButton
} from "react-bootstrap";
export const Buttons = ({
  gridSize,
  playButton,
  pauseButton,
  clear,
  slow,
  fast,
  seed
}) => {
  const handleSelect = (evt) => {
    gridSize(evt);
  };
  return (
    <div className="container">
      <ButtonToolbar>
        <Button className="btn btn-default" onClick={playButton}>
          Play
        </Button>
        <Button className="btn btn-default" onClick={pauseButton}>
          Pause
        </Button>
        
        <Button className="btn btn-default" onClick={slow}>
          slow
        </Button>
        <Button className="btn btn-default" onClick={fast}>
          fast
        </Button>
        
        <DropdownButton
          id="size-menu"
          title="Grid Size"
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="1">10x20</Dropdown.Item>
          <Dropdown.Item eventKey="2">20x30</Dropdown.Item>
          <Dropdown.Item eventKey="3">30x40</Dropdown.Item>
        </DropdownButton>
        {/* <Dropdown>
          <Dropdown.Toggle id="size-menu" onSelect={handleSelect}>
            Grid Size
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="1">20x10</Dropdown.Item>
            <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
            <Dropdown.Item eventKey="3">70x50</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </ButtonToolbar>
      ;
    </div>
  );
};
