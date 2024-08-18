import { useAllBlogPostsQuery } from '@/redux/api/blogPost';
import { IBlogPost } from '@/types';
import { Card, Col, Image, Row, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import Link from 'next/link';
import React from 'react'

export default function BlogPostSection() { 
    const { data, isLoading } = useAllBlogPostsQuery({});
    console.log("dataaa ", data);
    return (
      <div style={{color:"white",marginTop:"30px",borderTop:"2px solid #F7EFE5"}}>
        {isLoading ? (
          <Spin style={{ marginTop: "200px" }} tip="Loading" size="large">
            <div className="content" />
          </Spin>
        ) : (
          <div > 
            <h1 style={{ textAlign: "center",color:'black' }}> Blog Posts</h1>
  
            <div style={{margin:'30px'}}>
              <Row gutter={50}>
                  {
                      data?.blogPosts?.map((blogPost:IBlogPost)=>{
                          return (
                              <Col key={blogPost.id} sm={6}>
                              <Link href={`/user/blog-post/${blogPost.id}`}>
                              <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={
                                  <Image
                                  width={240}
                                  height={240}
                                    alt="example"
                                    src={blogPost.image}
                                  />
                                }
                              >
                                <Meta
                                  title={blogPost.title}
                                  description={`${blogPost.description.slice(0,50)}...`}
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
