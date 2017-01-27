import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group, Circle, Line} from 'react-konva';



export default class Canvas2 extends React.Component {
 
    constructor(...args) {
      super(...args);
      this.state = {
        color: 'green',
        context: '',
        dragging: false,
        dragStartLocation: ''
      };
      this.handleLoad = this.handleLoad.bind(this);
      this.drag = this.drag.bind(this);
      this.dragStart = this.dragStart.bind(this);
      this.dragStop = this.dragStop.bind(this);
      this.drawLine = this.drawLine.bind(this);
      this.getCanvasCoordinates = this.getCanvasCoordinates.bind(this);
    }

    componentDidMount() {
    this.setState({
      context: this.refs.canvas.getContext('2d')
      //content: document.getElementById('canvas').getContext('2d')
    }, function(){
      this.handleLoad();
    });

  }

    getCanvasCoordinates(event){
      var x = event.clientX - canvas.getBoundingClientRect().left,
          y = event.clientY - canvas.getBoundingClientRect().top;

          return{x: x, y: y};
    }

    drawLine(position){
      console.log("the context is: ", this.state.context);
      //context = this.state.canvas.getContext('2d')
      this.state.context.beginPath();
      this.state.context.moveTo(this.state.dragStartLocation.x, this.state.dragStartLocation.y);
      this.state.context.lineTo(position.x, position.y);
      this.state.context.stroke();
    }
  
    
    handleLoad() {
      //this.state.context = this.refs.canvas.getContext('2d')
      console.log("inside handleLoad");
      this.state.context.strokeStyle = "purple";
      this.state.context.lineWidth = 6;
      this.state.context.lineCap = "round";
    }

    drag(event){
      var position = '';
      if(this.state.dragging === true){
        position = this.getCanvasCoordinates(event);
        this.drawLine(position);
      }
      console.log("in drag, dragging is: ", this.state.dragging);
      console.log(this.getCanvasCoordinates(event));
    }

    dragStart(event){
      console.log("inside drag start");
      this.setState({
      dragging: true
    });
      this.state.dragging = true;
      this.state.dragStartLocation = this.getCanvasCoordinates(event);
      console.log("in drag start, dragging is: ", this.state.dragging);
      console.log(this.getCanvasCoordinates(event));
    }

    dragStop(event){
      console.log("inside drag stop");
      this.setState({
      dragging: true
    });
      var position = this.getCanvasCoordinates(event);
      this.drawLine(position);
      console.log("in drag stop, dragging is: ", this.state.dragging);
      console.log(this.getCanvasCoordinates(event));
    }

    render() {
        return (
            <div onLoad={this.handleLoad}>
              <canvas id="canvas" ref="canvas" width="600" height="600" onMouseUp={this.dragStop} onMouseMove={this.drag} onMouseDown={this.dragStart}></canvas>
            </div>
            
        );
    };
}


