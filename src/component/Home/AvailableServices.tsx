import {
  useAvailableServiceQuery,
  useCreateAddToCartMutation,
  useServicesQuery,
} from "@/redux/api/service";
import { Button, Card, Col, Input, InputNumber, Row, message } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import Spinner from "../Common/Spinner";
import { IService } from "@/types";
import Image from "next/image";
import { useDebounced } from "@/redux/hooks";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.service";

export default function AvailableServices() {
  const { userId } = getUserInfo() as any;

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
  const { data, isLoading } = useAvailableServiceQuery({ ...query });
  console.log("daata ", data);
  const [createAddToCart] = useCreateAddToCartMutation();
  const addTOCart = async (serviceId: number) => {
    message.loading("addToCart.....", 1);
    try {
      //   console.log(data);
      const res: any = await createAddToCart({
        body: {
          userId: userId,
          serviceId: serviceId,
        },
      });
      if (res?.data) {
        console.log("res   ", res);
        message.success("AddToCart successfully", 1);
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };
  return (
    <div
      style={{
        padding: "10px",
        width: "90%",
        margin: "auto",
        border: "3px solid #d6d6d6",
        borderRadius: 5,
        marginTop: "5px",
        boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
        backgroundColor: "white",
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
            Available Services
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
          <div>
            <p style={{ display: "inline", marginRight: "10px" }}>Min Price</p>
            <Input
              style={{ width: "100px" }}
              type="number"
              onChange={(e: any) => setMinPrice(e?.target?.value)}
              defaultValue={0}
            />

            <p
              style={{
                display: "inline",
                marginLeft: "20px",
                marginRight: "10px",
              }}
            >
              Max Price
            </p>
            <Input
              type="number"
              style={{ width: "100px" }}
              onChange={(e: any) => setMaxPrice(e?.target?.value)}
              // defaultValue={}
              defaultValue={0}
            />
            <br />
            <br />
          </div>
          <Row gutter={50}>
            {data?.services && data?.services[0] ? (
              data?.services?.map((service: IService) => {
                return (
                  <Col key={service.id} xl={6}>
                    <Card
                      hoverable
                      style={{ width: 300 }}
                      cover={
                        <Image
                          width={150}
                          height={150}
                          alt={service.title}
                          src={service.image}
                        />
                      }
                      actions={[
                        <Button key={service.id} type="primary">
                          <Link
                            style={{ color: "white" }}
                            href={`/booking/${service.id}`}
                          >
                            Book Now
                          </Link>
                        </Button>,
                        <Button
                          onClick={() => addTOCart(service.id)}
                          key={service.id}
                          type="default"
                        >
                          Add to Cart
                        </Button>,
                      ]}
                    >
                      <Card.Meta
                        title={service.title}
                        description={service.description.slice(0,120)}
                      />......
                      <div>
                        <strong>Category: </strong>
                        {service.category}
                      </div>
                      <div>
                        <strong>Price: </strong>${service.price}
                      </div>
                      <div>
                        <strong>Rating: </strong>
                        {service.rating}
                      </div>
                      <div>
                        <strong>Location: </strong>
                        {service.serviceLocation}
                      </div>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <div
                style={{ textAlign: "center", width: "100%", color: "#ff1f4f" }}
              >
                <br />
                <br />
                <hr />
                <h2>Services Not Available</h2>
                <hr />
                <br />
                <br />
              </div>
            )}
          </Row>
        </>
      )}
    </div>
  );
}
