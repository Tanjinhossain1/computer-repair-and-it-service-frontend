import { useServicesQuery } from "@/redux/api/service";
import { useDebounced } from "@/redux/hooks";
import { Button, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import Spinner from "../Common/Spinner";
import { IService } from "@/types";
import Image from "next/image";

export default function EventsByCategory() {
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
  const { data: data1, isLoading: isLoading1 } = useServicesQuery({});
  const uniqueCategories = [];
  const seenCategories = new Set();
  return (
    <> {isLoading || isLoading1 ? (
      <Spinner color="white" />
    ) : (
    <div
      style={{
        padding: "10px",
        width: "80%",
        margin: "auto",
        // border: "6px solid #C780FA",
        borderRadius: 5,
        marginTop: "20px",
        boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
        backgroundColor: "#F7EFE5",
        animation: "moveUpDown 3s infinite alternate"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "10px",color:'#d085d4' }}>
        Events By Category Services
      </h1>
      <Row gutter={50}>
        {data1?.services && data1?.services[0]
          ? data1?.services.map((service: IService) => {
              const category = service.category;
              if (!seenCategories.has(category)) {
                seenCategories.add(category);
                uniqueCategories.push(category);
                return (
                  <Col key={category}>
                    <Button onClick={() => setSearchTerm(category)}>
                      {category}
                    </Button>
                  </Col>
                );
              }
              return null;
            })
          : null}
      </Row>

      <br />
      <br />
      <Row>
       
          <>
            {data?.services && data?.services[0]
              ? data?.services.map((service: IService) => {
                  return (
                    <Col style={{marginBottom:"20px"}} key={service?.id} lg={6}>
                      <Card
                        hoverable
                        style={{ width: 240,height:260 }}
                        cover={
                          <Image
                            width={150}
                            height={150}
                            alt="example"
                            src={service?.image}
                          />
                        }
                      >
                        
                     <h4>{service.title}</h4>
                     <div style={{position: 'absolute', bottom: 0, width: '80%' }}>
                        <Button disabled={service.status === "up-coming"} type="primary" style={{ width: "100%",marginBottom:"20px" }}>
                           {service.status === "up-coming" ? "Up Coming " : "Book"}
                        </Button>
                        </div>
                      </Card>
                    </Col>
                  );
                })
              : null}
          </>
      </Row>
    </div>
        )}
    </>
  );
}
