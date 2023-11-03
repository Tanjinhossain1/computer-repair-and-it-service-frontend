'use client'
import {
  CheckCircleFilled,
  CheckOutlined,
  FileTextOutlined,
  LikeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import React from "react";

export default function ChooseUs() {
  return (
    <div style={{ backgroundColor: "#F7EFE5",paddingBottom:"30px" }}>
      <div style={{ width: "80%", margin: "auto" }}>
        <h1 style={{ textAlign: "center" }}>WHY CHOOSE US</h1>
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          Our main differences
        </p>
        <div style={{ width: "60%", margin: "auto" }}>
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            At Computer Services, we understand that choosing the right computer
            service provider is crucial to ensuring your technology runs
            smoothly and efficiently. Here are some compelling reasons to trust
            us with your computer service needs. Our team consists of highly
            skilled and certified technicians with years of experience in the
            computer service industry. We stay up-to-date with the latest
            technologies to provide you with top-notch solutions.
          </p>
        </div>
        
      </div>
      <div style={{ marginTop:"30px" }}>
          <div style={{margin:"auto", width:"80%" }}>
            <Row  gutter={50}>
              <Col lg={6}>
                <Card>
                  <Image
                    style={{ borderRadius: 10 }}
                    width={300}
                    height={100}
                    alt=""
                    src={
                      "https://demo.brothersthemes.com/comrepair/wp-content/uploads/sites/2/2017/04/clock-407101_19201-470x313.jpg"
                    }
                  ></Image>
                  <h3
                    style={{
                      textAlign: "center",
                      color: "#ff3bde",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    <CheckCircleFilled />
                  </h3>
                  <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                    EXPERIENCE
                  </h2>

                  <p style={{ textAlign: "center", marginTop: "10px" }}>
                    Our team consists of highly skilled and certified
                    technicians with years of experience in the computer service
                    industry. We stay up-to-date with the 
                    provide you with top-notch solutions.
                  </p>
                </Card>
              </Col>

              <Col lg={6}>
                <Card>
                  <Image
                    style={{ borderRadius: 10 }}
                    width={300}
                    height={100}
                    alt=""
                    src={
                      "https://demo.brothersthemes.com/comrepair/wp-content/uploads/sites/2/2017/04/0N4A9940-470x313.jpg"
                    }
                  ></Image>
                  <h3
                    style={{
                      textAlign: "center",
                      color: "#ff3bde",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    <SettingOutlined />
                  </h3>
                  <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                    SKILL
                  </h2>

                  <p style={{ textAlign: "center", marginTop: "10px" }}>
                    We let our satisfied clients speak for us. Check out our
                    testimonials to see what others have to say about their
                    experiences with our computer services.
                  </p>
                </Card>
              </Col>

              <Col lg={6}>
                <Card>
                  <Image
                    style={{ borderRadius: 10 }}
                    width={300}
                    height={100}
                    alt=""
                    src={
                      "https://demo.brothersthemes.com/comrepair/wp-content/uploads/sites/2/2017/04/document-428335_1920-470x313.jpg"
                    }
                  ></Image>
                  <h3
                    style={{
                      textAlign: "center",
                      color: "#ff3bde",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    <FileTextOutlined />
                  </h3>
                  <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                    GUARANTEES
                  </h2>

                  <p style={{ textAlign: "center", marginTop: "10px" }}>
                    Quality service doesn{`'`}t have to come with a hefty price
                    tag. We offer competitive and transparent pricing, ensuring
                    you get the best value for your investment.
                  </p>
                </Card>
              </Col>
              <Col lg={6}>
                <Card>
                  <Image
                    style={{ borderRadius: 10 }}
                    width={400}
                    height={200}
                    alt=""
                    src={
                      "https://demo.brothersthemes.com/comrepair/wp-content/uploads/sites/2/2017/04/diamond-1186139-2-470x265.jpg"
                    }
                  ></Image>
                  <h3
                    style={{
                      textAlign: "center",
                      color: "#ff3bde",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    <LikeOutlined />
                  </h3>
                  <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                    Quality
                  </h2>

                  <p style={{ textAlign: "center", marginTop: "10px" }}>
                    Quality service doesn{`'`}t have to come with a hefty price
                    tag. We offer competitive and transparent pricing, ensuring
                    you get the best value for your investment.
                  </p>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
    </div>
  );
}
