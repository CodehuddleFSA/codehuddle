import React from 'react';
import {connect} from 'react-redux';
import Konva from 'react-Konva';
import Immutable from 'immutable';
import {WhiteboardToolbar} from './WhiteboardToolbar';

const DEFAULT_STROKE_SIZE = 4;
const ERASER_STROKE_SIZE = 50;
const SQUARE_SIDE_SIZE = 30;
const DEFAULT_COLOR = 'black';
const palette = ['green', 'red', 'blue', 'purple', 'black', 'yellow'];

// ------------------------ Whiteboard Dumb Component ------------------------ //
export const Whiteboard = (props) => {
  let history = props.history;
  let show = (history.length !== 0);
  return (
      <Konva.Stage width={700} height={700} onContentMouseUp = {props.handleMouseUp}
            onContentMouseDown = {props.handleMouseDown}
            onContentMouseMove = {props.handleMouseMove} >
        <Konva.Layer >
           <Konva.Group>
            {show && history.map((drawEvent, i) => {
              return (
                <Konva.Line stroke = {drawEvent.color}
                  key = {i}
                  points = {[drawEvent.lastPx.x, drawEvent.lastPx.y,
                    drawEvent.currentPx.x, drawEvent.currentPx.y]}
                  strokeWidth = {drawEvent.strokeWidth}
                  lineCap = 'round'
                  lineJoin = 'round'
                />
              );
            })}
          </Konva.Group>
        </Konva.Layer>
      </Konva.Stage>
  );
};

// ------------------------ Whiteboard Container ------------------------ //
export class WhiteboardContainer extends React.Component {
  constructor (props) {
    super(props);
    this.drawing = this.props.drawing;
    this.lastPx = this.props.lastDraw.lastPx;
    this.currentPx = this.props.lastDraw.currentPx;
    this.color = this.props.lastDraw.color;
    this.strokeWidth = this.props.lastDraw.strokeWidth;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleErase = this.handleErase.bind(this);
  }

  handleMouseDown (event) {
    this.drawing = true;
    this.currentPx = {x: event.evt.offsetX, y: event.evt.offsetY};
  }

  handleColorChange (event) {
    // Update current mouse position
    console.log('in change event with color ', event.target.attrs.fill);
    this.color = event.target.attrs.fill;
    this.strokeWidth = DEFAULT_STROKE_SIZE;
  }

  handleClear () {
    this.props.clearHistory();
  }

  handleErase () {
    this.color = 'white';
    this.strokeWidth = ERASER_STROKE_SIZE;
  }

  handleMouseMove (event) {
    if (!this.drawing) return; // Short circuit if mouse button isn't down
    // Update last and current mouse positions
    this.lastPx = {x: this.currentPx.x, y: this.currentPx.y};
    this.currentPx = {x: event.evt.offsetX, y: event.evt.offsetY};

    // Send dispatch out for new coordinates (end of stroke)
    this.props.setCoordinates(this.lastPx, this.currentPx, this.color, this.strokeWidth);
  }

  handleMouseUp () {
    this.drawing = false;
    // document.body.style.cursor = 'default';
  }

  render () {
    console.log('handleColorChange ', this.handleColorChange);
    return (
      <div>
        <WhiteboardToolbar
          handleColorChange = {this.handleColorChange}
          handleClear = {this.handleClear}
          handleErase = {this.handleErase}
        />
        <Whiteboard
          history = {this.props.drawingHistory}
          handleMouseUp = {this.handleMouseUp}
          handleMouseDown = {this.handleMouseDown}
          handleMouseMove = {this.handleMouseMove}
        />
      </div>
/*
          <Konva.Group>
            {palette.map((color, i) => {
              return (
                <Konva.Rect
                  key = {i}
                  stroke = {color}
                  ref="rect"
                  x={0 + (i % 2) * SQUARE_SIDE_SIZE}
                  y={0 + Math.floor(i / 2) * SQUARE_SIDE_SIZE}
                  width={SQUARE_SIDE_SIZE}
                  height={SQUARE_SIDE_SIZE}
                  fill={color}
                  onClick={this.handleColorChange}
                />
              );
            })}
            <Konva.Text
                ref="clear"
                x={40}
                y={110}
                width="35"
                height="10"
                text="Clear"
                fontSize={12}
                fontFamily="Calibri"
                onClick={this.handleClear}
            />
            <Konva.Text
                ref="eraser"
                x={0}
                y={110}
                width="35"
                height="10"
                text="Eraser"
                fontSize={12}
                fontFamily="Calibri"
                onClick={this.handleErase}
            />
          </Konva.Group>
        </Konva.Layer>
      </Konva.Stage>*/
    );
  }
}

/* -----------------    CONNECT CONTAINER     ------------------ */

import { setCoordinates, clearHistory } from '../reducers/whiteboard';

const mapStateToProps = (state) => {
  return {
    lastDraw: state.interview.whiteboard.get('lastDraw').toJS(),
    drawingHistory: state.interview.whiteboard.get('drawingHistory').toJS()
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCoordinates: (lastPx, currentPx, color, strokeWidth) => {
      dispatch(setCoordinates(lastPx, currentPx, color, strokeWidth));
    },
    clearHistory: () => {
      dispatch(clearHistory());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WhiteboardContainer);
