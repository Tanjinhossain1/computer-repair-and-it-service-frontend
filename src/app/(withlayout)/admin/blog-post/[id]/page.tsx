"use client";
import { useBlogPostQuery } from "@/redux/api/blogPost";
import { Spin } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

export default function ViewBlogPost() {
  const { id } = useParams();
  const { data, isLoading } = useBlogPostQuery({ id });
  console.log("dataad ef  ", data);
  return (
    <div>
      {isLoading ? (
        <Spin style={{ marginTop: "200px" }} tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <div>
          <div style={{ width: "80%", margin: "auto", textAlign: "left" }}>
            <h1>{data.title}</h1>
          </div>
          <br />
          <br />
          <div style={{ width: "80%", margin: "auto", textAlign: "left" }}>
            <p>{data.topShortDescription}</p>
          </div>
          <div
            style={{
              width: "80%",
              margin: "auto",
              marginTop: "10px",
              textAlign: "left",
            }}
          >
            <Image alt="" src={data.image} width={250} height={250}></Image>
          </div>
          <br />
          <br />
          <div style={{ width: "80%", margin: "auto", textAlign: "left" }}>
            <h5>{data.description}</h5>
          </div>
        </div>
      )}
    </div>
  );
}
