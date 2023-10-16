"use client";
import { authKey } from "@/constants/storageKey";
import { useBlogPostQuery, useDeleteBlogPostMutation } from "@/redux/api/blogPost";
import { getUserInfo, removeLocalStorageInfo } from "@/services/auth.service";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Spin, message } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

export default function ViewBlogPost() {
  const { role } = getUserInfo() as any;
  const history = useRouter();
  if (role !== "admin") {
    removeLocalStorageInfo(authKey);
    history.push("/login");
  }
  const [deleteBlogPost] = useDeleteBlogPostMutation();

  const { id } = useParams();
  const { data, isLoading } = useBlogPostQuery({ id }); 
  
  const deleteTheBlogPost = async () => {
    message.loading("Deleting.....", 1);
    try {
      //   console.log(data);
      await deleteBlogPost({ id });
      message.success("Deleted successfully", 1);
      history.push('/admin/blog-post')
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };
  return (
    <div>
      {isLoading ? (
        <Spin style={{ marginTop: "200px" }} tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <div>
          <div style={{ width: "80%", margin: "auto", textAlign: "left",display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"20px" }}>
            <h1>{data.title}</h1>
            <Button onClick={deleteTheBlogPost} danger type="primary"><DeleteOutlined ></DeleteOutlined></Button>
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
