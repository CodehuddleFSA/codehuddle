// Required libraries
import React from 'react';
const { Component } = React;
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

class Canvas extends Component {
  componentDidMount () {
    // Set the canvas context
    const canvas = findDOMNode(this.refs.canvas);
    const ctx = canvas.getContext('2d');
    this.props.initCanvas(ctx);

    // Initialize default state for canvas
    const currentMousePosition = { x: 0, y: 0 };
    const lastMousePosition = { x: 0, y: 0 };
    let drawing = false;

    const self = this; // :(
    canvas.addEventListener('mousedown', function (evt) {
      drawing = true;
      // Update current mouse position
      currentMousePosition.x = evt.pageX - this.offsetLeft;
      currentMousePosition.y = evt.pageY - this.offsetTop;
    });

    canvas.addEventListener('mouseup', function () {
      drawing = false;
    });

    canvas.addEventListener('mousemove', function (evt) {
      if (!drawing) return; // Short circuit if mouse button isn't down

      // Update last and current mouse positions
      lastMousePosition.x = currentMousePosition.x;
      lastMousePosition.y = currentMousePosition.y;
      currentMousePosition.x = evt.pageX - this.offsetLeft;
      currentMousePosition.y = evt.pageY - this.offsetTop;

      // Send dispatch out for new coordinates
      self.props.setCoordinates(lastMousePosition, currentMousePosition, '#000000');
    });
  }

  componentWillUpdate () {
    // On drawing, the props will update and cause a draw
    // Initiate context and bring in drawing data
    const { lastPx, currentPx, color } = this.props.lastDraw;
    const ctx = this.props.ctx;

    // Drawing
    if (!ctx.notReady) { // Only draw if context is initialized
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.moveTo(lastPx.x, lastPx.y);
      ctx.lineTo(currentPx.x, currentPx.y);
      ctx.closePath();
      ctx.stroke();
    }
  }

  render () {
    return (
        <canvas ref="canvas" width="1000px" height="1000px" />
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

import { initCanvas, setCoordinates } from '../reducers/whiteboard';

const mapStateToProps = (state) => {
  return {
    lastDraw: state.interview.whiteboard.lastDraw,
    ctx: state.interview.whiteboard.ctx
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

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
