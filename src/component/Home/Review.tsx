import React from "react";
import { Avatar, Card, Carousel } from "antd";
import { useAllFeedBackQuery } from "@/redux/api/feedBackApi";
import Spinner from "../Common/Spinner";
import { IFeedback } from "@/types";
import Meta from "antd/es/card/Meta";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

const contentStyle: React.CSSProperties = {
  height: "300px",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  background: "#101242",
};

export default function Review() {
  const { data, isLoading } = useAllFeedBackQuery({});
  return isLoading ? (
    <Spinner />
  ) : (
    <div style={{ width: "50%", margin: "auto", marginTop: "10px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "white" }}>
        Client Review
      </h1>
      
      <Carousel autoplay dots={false} autoplaySpeed={2000} effect="fade"
      slidesToShow={3}
      responsive={[
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          },
        },
      ]}
        >
       
        {
          data?.feedback ? data?.feedback[0] ? 
            data?.feedback?.map((feedBack: IFeedback)=>{
              return <Card  hoverable key={feedBack.id}> 
              <Meta
                avatar={<Avatar src={feedBack.user.profileImage} />}
                title={<Title level={4}>{feedBack.user.firstName}</Title>}
                description={<Paragraph>{feedBack.comment}</Paragraph>}
              /> 
              </Card>
            })
          : null : null
        } 
       
      </Carousel>
    </div>
  );
}
