import { Card, Col, Row } from "antd";
import Link from "next/link";
import React from "react";

export default function LatestNews() {
  const news = [
    {
      id: 1,
      title: "New Computer Services Offered",
      content: "We now provide a wider range of computer services.",
    },
    {
      id: 2,
      title: "Upcoming Tech Conference",
      content: "Join us at the tech conference next month.",
    },
    {
      id: 3,
      title: "Upcoming Tech Conference",
      content: "Join us at the tech conference next month.",
    },
    {
      id: 4,
      title: "Upcoming Tech Conference",
      content: "Join us at the tech conference next month.",
    },
    // Add more news items as needed
  ];

  return (
    <div style={{ backgroundColor: "#f7f0f4",padding:"30px",marginTop:"20px" }}>
      <div style={{ width: "80%", margin: "auto" }}>
        <div>
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
            Latest Computer Services News
          </h2>

          <Row gutter={16}>
            {news.map((newsItem) => (
              <Col span={6} key={newsItem.id}>
                <Card title={<h3>{newsItem.title}</h3>}>
                  <p>{newsItem.content}</p>
                </Card>
              </Col>
            ))}
          </Row>
          <h4 style={{ textAlign: "end" }}>
            <Link href={"/news"}>See More --{`>`}</Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
