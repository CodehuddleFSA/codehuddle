// Required libraries
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

// const palette = ['green', 'red', 'blue', 'purple', 'black', 'yellow'];
const palette = ['green', 'red'];

/* -----------------    COMPONENT     ------------------ */

export const WhiteboardToolbar = (props) => {
  // need color, strokewidth
  console.log('props in toolbar ', props);
  const buttonStyle = { fontSize: 6, padding: 0 };
  return (
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <ToolbarTitle text="Palette" />
        {palette.map((color, i) => {
          return (
            <RaisedButton
            key = {i}
            label='x'
            labelColor = {color}
            backgroundColor = {color}
            buttonStyle = {buttonStyle}
            onClick = {(event) => {
              console.log('in click handler');
              props.handleChangeColor(event);
            }
            }
            />
          );
        })}
        <ToolbarSeparator />
        <RaisedButton label="Eraser" primary={true} />
        <RaisedButton label="Clear Board" primary={true} />
      </ToolbarGroup>
    </Toolbar>
  );
};
