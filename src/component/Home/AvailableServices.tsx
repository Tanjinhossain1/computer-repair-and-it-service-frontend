import { useServicesQuery } from "@/redux/api/service";
import { Button, Card, Col, Input, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import Spinner from "../Common/Spinner";
import { IService } from "@/types";
import Image from "next/image";
import { useDebounced } from "@/redux/hooks";
import { SearchOutlined } from "@ant-design/icons";

export default function AvailableServices() {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  
  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useServicesQuery({ ...query });
  console.log('daata ', data)
  return (
    <div
      style={{
        padding: "10px",
        width: "80%",
        margin: "auto",
        border: "3px solid #d6d6d6",
        borderRadius: 5,
        marginTop: "5px",
        boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
        backgroundColor: "white",
      }}
    >
      {
        isLoading ? <Spinner /> :
     <>
     
     <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        Available Services
      </h1>
      <div
      style={{
        marginTop: '10px',
        marginBottom: '10px',
        width: '300px',
        borderRadius: '10px',
        border: '3px solid transparent',
        backgroundImage: 'linear-gradient(45deg, #f06, #9f6)',
        backgroundClip: 'content-box, padding-box',
      }}
    >
      <Input
        placeholder="Search..."
        size="large"
        prefix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
         
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div> 
      <Row>
        { 
        data?.services && data?.services[0] ?
        data?.services?.map((service:IService)=>{
          return <Col key={service.id} lg={6}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <Image
              width={150}
              height={150}
                alt="example"
                src={service.image}
              />
            }
          >
            <h3>{service.title}</h3>
            <p><b>Price:</b> {service.price}</p>
            <p><b>Rating:</b> {service.rating}</p>
            <p><b>description: </b>{service.description}</p>
            <Button type="primary" style={{ width: "100%" }}>
              Book
            </Button>
          </Card>
        </Col> 
        }) 
         : <div style={{textAlign:"center",width:"100%",color:"#ff1f4f"}}>
          <br />
          <br />
          <hr />
        <h2 >Services Not Available</h2>
          <hr />
          <br />
          <br />
      </div> 
        } 
      </Row> 
      </>
      }
    </div>
  );
}
