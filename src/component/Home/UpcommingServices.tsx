import { useUpComingServiceQuery } from "@/redux/api/service";
import { useDebounced } from "@/redux/hooks";
import { Button, Card, Col, Input, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import Spinner from "../Common/Spinner";
import { IService } from "@/types";
import Image from "next/image";
import { SearchOutlined } from "@ant-design/icons";

export default function UpComingServices() {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  const debouncedMinPrice = useDebounced({
    searchQuery: minPrice,
    delay: 600,
  });
  const debouncedMaxPrice = useDebounced({
    searchQuery: maxPrice,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  if (!!debouncedMinPrice) {
    query["minPrice"] = debouncedMinPrice;
  }
  if (!!debouncedMaxPrice) {
    query["maxPrice"] = debouncedMaxPrice;
  }
  console.log(
    "price  ",
    minPrice,
    maxPrice,
    debouncedMaxPrice,
    debouncedMinPrice
  );
  const { data, isLoading } = useUpComingServiceQuery({ ...query });
  console.log("daata ", data);
  return (
    <div
    style={{
      padding: "10px",
      width: "80%",
      margin: "auto",
      border: "6px solid #C780FA",
      borderRadius: 5,
      marginTop: "5px",
      boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
      backgroundColor: "#F7EFE5",
    }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
            Up Coming Services
          </h1>
          <div
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              width: "300px",
              borderRadius: "10px",
              border: "3px solid transparent",
              backgroundImage: "linear-gradient(45deg, #f06, #9f6)",
              backgroundClip: "content-box, padding-box",
            }}
          >
            <Input
              placeholder="Search..."
              size="large"
              prefix={
                <SearchOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> 
          <Row>
            {data?.services
              ? data?.services[0] &&
                data?.services.map((service: IService) => {
                  return (
                    <Col key={service.id} lg={6}>
                      <Card
                        hoverable
                        style={{ width: 240,height:290 }}
                        cover={
                          <Image
                            width={150}
                            height={150}
                            alt="example"
                            src={service?.image}
                          />
                        }
                      >
                        <h2>{service.title}</h2>
                      <div style={{position: 'absolute', bottom: 0, width: '80%' }}>
                      <Button type="primary" disabled style={{ width: "100%",marginBottom:"20px" }}>
                          Coming Soon
                        </Button>
                      </div>
                      </Card>
                    </Col>
                  );
                })
              : null}  
          </Row>
        </>
      )}
    </div>
  );
}
