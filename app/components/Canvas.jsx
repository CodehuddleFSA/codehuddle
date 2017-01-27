import React from 'react';
const { Component } = React;
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

// Smart-ish component
class Canvas extends Component {
  componentDidMount () {
    const canvas = findDOMNode(this.refs.canvas);

    const currentMousePosition = {
      x: 0,
      y: 0
    };

    const lastMousePosition = {
      x: 0,
      y: 0
    };

    let drawing = false;

    const self = this; // :(
    canvas.addEventListener('mousedown', function (e) {
      drawing = true;
      currentMousePosition.x = e.pageX - this.offsetLeft;
      currentMousePosition.y = e.pageY - this.offsetTop;
    });

    canvas.addEventListener('mouseup', function () {
      drawing = false;
    });

    canvas.addEventListener('mousemove', function (e) {
      if (!drawing) return;

      lastMousePosition.x = currentMousePosition.x;
      lastMousePosition.y = currentMousePosition.y;

      currentMousePosition.x = e.pageX - this.offsetLeft;
      currentMousePosition.y = e.pageY - this.offsetTop;

      self.props.setCoordinates(lastMousePosition, currentMousePosition, '#000000');
    });

    const ctx = canvas.getContext('2d');
    this.props.initCanvas(ctx);
  }

  componentWillUpdate () {
    const { lastPx, currentPx, color } = this.props.lastDraw;
    if (this.props.lastDraw.relay) {
      console.log('sendingRelay');
      this.props.setCoordinatesLocal(lastPx, currentPx, color);
    }
    console.log('inside RECEIVE PROPS', this.props.lastDraw);
  }

  render () {
    return (
        <canvas ref="canvas" width="1000px" height="1000px" />
    );
  }
}

import { initCanvas, setCoordinates, setCoordinatesLocal } from '../reducers/whiteboard';

// Connect component
const mapStateToProps = (state) => {
  return {
    lastDraw: state.interview.whiteboard.lastDraw
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initCanvas: (ctx) => {
      dispatch(initCanvas(ctx, 'spongebob'));
    },
    setCoordinates: (lastPx, currentPx, color) => {
      dispatch(setCoordinates(lastPx, currentPx, color));
    },
    setCoordinatesLocal: (lastPx, currentPx, color) => {
      dispatch(setCoordinatesLocal(lastPx, currentPx, color));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
