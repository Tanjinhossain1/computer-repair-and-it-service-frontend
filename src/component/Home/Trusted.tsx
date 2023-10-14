"use client";
import { Col, Row } from "antd";
import Image from "next/image";
import React from "react";

export default function Trusted() {
  const trust = [
    {
      id: 1,
      src: "https://demo.brothersthemes.com/comrepair/wp-content/uploads/sites/2/2017/04/Logo-01-11-114x120.png",
    },
    {
      id: 1,
      src: "https://demo.brothersthemes.com/comrepair/wp-content/uploads/sites/2/2017/04/Logo-02-11-97x120.png",
    },
    {
      id: 1,
      src: "https://demo.brothersthemes.com/comrepair/wp-content/uploads/sites/2/2017/04/Logo-03-11-137x120.png",
    },
    {
      id: 1,
      src: "https://demo.brothersthemes.com/comrepair/wp-content/uploads/sites/2/2017/04/Logo-04-11-150x150.png",
    },
    {
      id: 1,
      src: "https://demo.brothersthemes.com/comrepair/wp-content/uploads/sites/2/2017/04/Logo-05-11-110x120.png",
    },
  ];
  return (
    <div style={{width:"60%",margin:"auto",marginTop:"20px",marginBottom:"30px"}}>
      <h1 style={{ textAlign: "center" }}>WE ARE TRUSTED BY</h1>
    <h4 style={{ textAlign: "center",marginTop:"20px",color:"#a3a3a3" }}>Our regular customers</h4>
      
      <Row style={{margin:0, marginTop:"30px",width:"100%"}} gutter={80}>
        {trust.map((e: any) => {
          return (
            <Col  key={e.id}lg={4.8}> 
                <Image alt="" width={100} height={100} src={e.src}></Image> 
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
