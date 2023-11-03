"use client";
import { Button, Card, Col, Row } from "antd";
import { Footer } from "antd/es/layout/layout";
import Image from "next/image";
import React from "react";
import FormInput from "../Forms/FormInput";
import Form from "../Forms/Form";
import { MailOutlined, RiseOutlined, ZoomInOutlined } from "@ant-design/icons";

export default function FooterComponent() {
  return (
    <Footer style={{ background: "#a555ec", padding: "40px 0" }}>
      <Row style={{ width: "80%", margin: "auto" }} gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Image
            alt=""
            height={100}
            width={150}
            src={"/images/ComRepair11.png"}
          ></Image>
          <div style={{ width: "80%", color: "white", marginTop: "10px" }}>
            <p>
              Here We Give you many type of services, take eye of our site. Our
              services give you the best output and best service or compute{" "}
            </p>

            <h3 style={{ fontWeight: "bold", marginTop: "30px" }}>
              OUR NEWSLETTER
            </h3>
            <div style={{ marginTop: "20px" }}>
              <Form submitHandler={(data) => console.log(data)}>
                <FormInput style={{backgroundColor:"white"}}  name={"email"} placeholder="Enter Your Email" />
                <Button style={{backgroundColor:"#8c0e4d", marginTop:"10px"}} type="primary">SUBMIT</Button>
              </Form>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <h2 style={{color:"white",marginTop:"20px"}}>ADDRESS</h2>
        <div style={{marginTop:"30px", color:"white"}}>
        <p><ZoomInOutlined style={{color:"#ff0080"}}/> <span style={{marginLeft:"20px"}}>Narayanganj, dhaka, 2no dhakessory, goadnile</span></p>
      
        <p style={{marginTop:"20px"}}><RiseOutlined style={{color:"#ff0080"}}/> <span style={{marginLeft:"20px"}}>+880 1861557343</span> <br /><span style={{marginLeft:"37px"}}>+880 1643915203</span></p>
        </div>


        <p style={{marginTop:"30px" ,color:"white"}}><MailOutlined  style={{color:"#ff0080"}}/> <span style={{marginLeft:"20px"}}>tanjinhossain2003@gmail.com</span></p>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <h2 style={{color:"white",marginTop:"20px"}}>WORKING HOURS</h2>
        <div style={{color:'#dedcdd',marginTop:"30px"}}>
            <p>Monday  ................. <span style={{marginLeft:"20px"}}>9:00 - 19:00</span> </p>
            <p>Tuesday ................. <span style={{marginLeft:"20px"}}>9:00 - 19:00</span> </p>
            <p>Wednesday .............<span style={{marginLeft:"20px"}}>9:00 - 19:00</span> </p>
            <p>Thursday ................<span style={{marginLeft:"20px"}}>9:00 - 19:00</span> </p>
            <p>Friday .................... <span style={{marginLeft:"20px"}}>9:00 - 19:00</span> </p>
            <p>Saturday ................ <span style={{marginLeft:"20px"}}>9:00 - 19:00</span> </p>
            <p>Sunday .......................... <span style={{marginLeft:"20px"}}>Closed</span> </p>
        </div>
        </Col>
      </Row>
    </Footer>
  );
}
