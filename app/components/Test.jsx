import React from 'react'

export const Login = () => (
	<div>
  <div id="color-selector">
            <div className="marker selected" id="black"></div>
            <div className="marker" id="purple"></div>
            <div className="marker" id="red"></div>
            <div className="marker" id="blue"></div>
            <div className="marker" id="green"></div>
            <div className="marker" id="orange"></div>
            <div className="marker" id="yellow"></div>
            <div className="marker" id="brown"></div>
        </div>
        
        <div id="sketch">
          <canvas id="paint"></canvas>
        </div>
        </div>
)