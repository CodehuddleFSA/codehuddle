import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group, Line} from 'react-konva';

/*----------Line Component-----------*/


/*----------------Whiteboard Container--------------*/

export default class WhiteboardContainer extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        drawing: false,
        currentPx: {
          x: '',
          y: ''
        }
      }

      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);
      this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    handleMouseDown(evt) {
      this.state.drawing = true;
      // Update current mouse position
      currentMousePosition.x = evt.pageX - evt.target.offsetLeft;
      currentMousePosition.y = evt.pageY - this.offsetTop;
    });

    handleMouseMove() {
      if (!drawing) return; // Short circuit if mouse button isn't down

      // Update last and current mouse positions
      lastMousePosition.x = currentMousePosition.x;
      lastMousePosition.y = currentMousePosition.y;
      currentMousePosition.x = evt.pageX - this.offsetLeft;
      currentMousePosition.y = evt.pageY - this.offsetTop;

      // Send dispatch out for new coordinates
      self.props.setCoordinates(lastMousePosition, currentMousePosition, '#000000');
    });

    handleMouseUp() {
      this.state.drawing = false;
    });

    render() {
        return (
             <Stage width={700} height={700}>
                    <Layer>
                        <Line points = {[props.lastPx.x, props.lastPx.y, props.currentPx.x, props.currentPx.y]}
                          stroke = 'red'
                          strokeWidth = {15}
                          lineCap = 'round'
                          lineJoin = 'round'
                          onMouseUp= {this.handleMouseUp}
                          onMouseDown = {this.handleMouseDown}
                          onMouseMove = {this.handleMouseMove}
                          />
                    </Layer>
                  </Stage>
        );
    }
}

/* -----------------    CONNECT CONTAINER     ------------------ */

import { initCanvas, setCoordinates } from '../reducers/whiteboard';

const mapStateToProps = (state) => {
  return {
    lastDraw: state.interview.whiteboard.lastDraw
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initCanvas: (ctx) => {
      dispatch(initCanvas(ctx));
    },
    setCoordinates: (lastPx, currentPx, color) => {
      dispatch(setCoordinates(lastPx, currentPx, color));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WhiteboardContainer);
