import { Button, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

export default function UpComingServices() {
  return (
    <div style={{padding: "10px",width:"80%",margin: "auto", border: "3px solid #d6d6d6",borderRadius: 5,marginTop: '5px', boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`
}}>
      <h1 style={{ textAlign: "center",marginBottom: "10px" }}>Up Coming Services</h1>
      <Row >
        <Col lg={6}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
             <Button type="primary" style={{width:"100%"}}>Book</Button>
          </Card> 
        </Col>
        <Col lg={6}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
             <Button type="primary" style={{width:"100%"}}>Book</Button>
          </Card> 
        </Col>
        <Col lg={6}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
             <Button type="primary" style={{width:"100%"}}>Book</Button>
          </Card> 
        </Col>
        <Col lg={6}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Button type="primary" style={{width:"100%"}}>Book</Button>
          </Card> 
        </Col>
         
      </Row>
    </div>
  );
}
