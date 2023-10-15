"use client";
import UMBreadCrumb from "@/component/Common/UMBreadCrumb";
import { authKey } from "@/constants/storageKey";
import { useAllBlogPostsQuery } from "@/redux/api/blogPost";
import { getUserInfo, removeLocalStorageInfo } from "@/services/auth.service";
import { IBlogPost, IService } from "@/types";
import { Button, Card, Col, Row, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function BlogPost() {
  const { role } = getUserInfo() as any;
  const history = useRouter();
  if (role !== "admin") {
    removeLocalStorageInfo(authKey);
    history.push("/login");
  }
  const { data, isLoading } = useAllBlogPostsQuery({});
  console.log("dataaa ", data);
  return (
    <div>
      {isLoading ? (
        <Spin style={{ marginTop: "200px" }} tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <div>
          <UMBreadCrumb
            items={[
              {
                label: `${role}`,
                link: `/${role}/profile`,
              },
              {
                label: `blog-post`,
                link: `/${role}/blog-post`,
              },
            ]}
          />
          <div style={{ width: "80%" }}>
            <Link href={"/admin/blog-post/create"}>
              {" "}
              <Button style={{ textAlign: "end" }}>Create BlogPosts</Button>
            </Link>
          </div>
          <h1 style={{ textAlign: "center" }}>List Of Blog Posts</h1>

          <div style={{margin:'30px'}}>
            <Row gutter={50}>
                {
                    data?.blogPosts.map((blogPost:IBlogPost)=>{
                        return (
                            <Col key={blogPost.id} sm={6}>
                            <Link href={`/admin/blog-post/${blogPost.id}`}>
                            <Card
                              hoverable
                              style={{ width: 240 }}
                              cover={
                                <Image
                                width={100}
                                height={100}
                                  alt="example"
                                  src={blogPost.image}
                                />
                              }
                            >
                              <Meta
                                title={blogPost.title}
                                description={blogPost.description.slice(0,50)}
                              />
                            </Card>
                            </Link>
                          </Col>
                        )
                    })
                }
             
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}
