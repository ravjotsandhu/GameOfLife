import React from "react";
import {
  ButtonToolbar,
  Dropdown,
  Button,
  DropdownButton
} from "react-bootstrap";
export const Buttons = ({
  gridSize,
  PlayButton,
  PauseButton,
  Clear,
  Slow,
  Fast,
  Seed
}) => {
  const handleSelect = (evt) => {
    gridSize(evt);
  };
  return (
    <div>
      <ButtonToolbar>
        <Button className="btn btn-default" onClick={PlayButton}>
          Play
        </Button>
        <Button className="btn btn-default" onClick={PauseButton}>
          Pause
        </Button>
        <Button className="btn btn-default" onClick={Clear}>
          Clear
        </Button>
        <Button className="btn btn-default" onClick={Slow}>
          Slow
        </Button>
        <Button className="btn btn-default" onClick={Fast}>
          Fast
        </Button>
        <Button className="btn btn-default" onClick={Seed}>
          Seed
        </Button>
        <DropdownButton
          id="size-menu"
          title="Grid Size"
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="1">20x10</Dropdown.Item>
          <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
          <Dropdown.Item eventKey="3">70x50</Dropdown.Item>
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
