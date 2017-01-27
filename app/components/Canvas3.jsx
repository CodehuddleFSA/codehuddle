import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group, Circle, Line} from 'react-konva';



export default class Canvas3 extends React.Component {
 
    constructor(...args) {
      super(...args);
      this.state = {
        color: 'green',
        canvas: '',
        context: '',
        dragging: false,
        dragStartLocation: '',
        drawing: false,
        currentMousePosition: {
          x: 0,
          y: 0
        },
        lastMousePosition: {
          x: 0,
          y: 0
    }

      };
      this.handleLoad = this.handleLoad.bind(this);
      this.drag = this.drag.bind(this);
      this.dragStart = this.dragStart.bind(this);
      this.dragStop = this.dragStop.bind(this);
      //this.drawLine = this.drawLine.bind(this);
      this.draw = this.draw.bind(this);
    }

    componentDidMount() {
    this.setState({
      canvas: this.refs.canvas,
      context: this.refs.canvas.getContext('2d')
    }, function(){
      this.handleLoad();
    });

  }

    // getCanvasCoordinates(event){
    //   var x = event.clientX - canvas.getBoundingClientRect().left,
    //       y = event.clientY - canvas.getBoundingClientRect().top;

    //       return{x: x, y: y};
    // }

    // drawLine(position){
    //   console.log("the context is: ", this.state.context);
    //   //context = this.state.canvas.getContext('2d')
    //   this.state.context.beginPath();
    //   this.state.context.moveTo(this.state.dragStartLocation.x, this.state.dragStartLocation.y);
    //   this.state.context.lineTo(position.x, position.y);
    //   this.state.context.stroke();
    // }
  
    
    handleLoad() {
      //this.state.context = this.refs.canvas.getContext('2d')
      console.log("inside handleLoad");
      this.state.context.strokeStyle = "purple";
      this.state.context.lineWidth = 6;
      this.state.context.lineCap = "round";
    }

    draw(start, end) {

        // Draw the line between the start and end positions
        // that is colored with the given color.
        this.state.context.beginPath();
        this.state.context.strokeStyle = 'purple';
        this.state.context.moveTo(start.x, start.y);
        this.state.context.lineTo(end.x, end.y);
        this.state.context.closePath();
        this.state.context.stroke();
    }
  

    drag(event){
      if (!this.state.drawing) return;

        this.state.lastMousePosition.x = this.state.currentMousePosition.x;
        this.state.lastMousePosition.y = this.state.currentMousePosition.y;

        this.state.currentMousePosition.x = event.pageX - this.state.canvas.offsetLeft;
        this.state.currentMousePosition.y = event.pageY - this.state.canvas.offsetTop;

        this.draw(this.state.lastMousePosition, this.state.currentMousePosition);
    }

    dragStart(event){
      console.log("inside drag start");
      this.setState({
      drawing: true,
      // currentMousePosition.x : event.pageX - this.state.canvas.offsetLeft,
      // currentMousePosition.y : event.pageY - this.state.canvas.offsetTop
      currentMousePosition : {
        x: event.pageX - this.state.canvas.offsetLeft,
        y: event.pageY - this.state.canvas.offsetTop
      }
    });
      // this.state.dragging = true;
      // this.state.dragStartLocation = this.getCanvasCoordinates(event);
      // console.log("in drag start, dragging is: ", this.state.dragging);
      // console.log(this.getCanvasCoordinates(event));
    }

    dragStop(event){
      console.log("inside drag stop");
      this.setState({
      drawing: false
    });
    //   var position = this.getCanvasCoordinates(event);
    //   this.drawLine(position);
    //   console.log("in drag stop, dragging is: ", this.state.dragging);
    //   console.log(this.getCanvasCoordinates(event));
     }

    render() {
        return (
            <div onLoad={this.handleLoad}>
              <canvas id="canvas" ref="canvas" width="600" height="600" onMouseUp={this.dragStop} onMouseMove={this.drag} onMouseDown={this.dragStart}></canvas>
            </div>
            
        );
    };
}


