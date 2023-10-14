import React from "react"; 
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#101242',
  };

export default function Review() {
   
  return (
    <div style={{width: "50%", margin: 'auto',marginTop: "10px"}}>
        <h1 style={{textAlign: "center"}}>Client Review</h1>
        <Carousel autoplay dotPosition={'right'}  >
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
  );
}
