"use client";
import { useGetProfileDetailQuery } from "@/redux/api/userApi";
import { getUserInfo, removeLocalStorageInfo } from "@/services/auth.service";
import { Button, Card, Col, Divider, Popover, Row, Typography } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import EditProfile from "@/component/Common/EditProfile";
import UMBreadCrumb from "@/component/Common/UMBreadCrumb";
import { useRouter } from "next/navigation";
import { authKey } from "@/constants/storageKey";
import NavbarComponent from "@/component/Common/Navbar";
import dynamic from "next/dynamic";

const { Title, Text } = Typography;

function UserProfile() {
  const { role } = getUserInfo() as any;
  const history = useRouter();
  setTimeout(() => {
    if (role !== "user") {
      removeLocalStorageInfo(authKey);
      history.push("/login");
    }
  }, 1000);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const { userId } = getUserInfo() as any;
  const { data } = useGetProfileDetailQuery({ id: userId });
  const user = data?.profile;
  return (
    <div className="profile-page">
      <NavbarComponent />
      <Card
        title={
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Admin Profile</h2>
              <div style={{ textAlign: "center" }}>
                <Popover
                  content={
                    <EditProfile data={user} setOpenPopover={setOpenPopover} />
                  }
                  open={openPopover}
                >
                  <Button
                    onClick={() => setOpenPopover(!openPopover)}
                    type="primary"
                  >
                    EDIT PROFILE DETAIL
                  </Button>
                </Popover>
              </div>
            </div>
          </>
        }
        style={{ width: "100%" }}
      >
        <div style={{ textAlign: "center", borderRadius: "50" }}>
          <Image
            style={{ borderRadius: "10%" }}
            src={user?.profileImage ? user?.profileImage : ""}
            width={200}
            height={200}
            alt=""
          ></Image>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Title level={4}>Personal Information</Title>
            <Divider />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text strong>First Name: </Text>
            <Text>{user?.firstName} </Text>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text strong>Last Name: </Text>
            <Text>{user?.lastName} </Text>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text strong>Middle Name: </Text>
            <Text>{user?.middleName || "-"} </Text>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text strong>Date of Birth: </Text>
            <Text>
              {dayjs(user?.dateOfBirth).format("MMM D, YYYY hh:mm A")}{" "}
            </Text>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text strong>Gender: </Text>
            <Text>{user?.gender || "-"} </Text>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text strong>Blood Group: </Text>
            <Text>{user?.bloodGroup || "-"} </Text>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text strong>Email: </Text>
            <Text>{user?.email} </Text>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text strong>Contact No: </Text>
            <Text>{user?.contactNo} </Text>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text strong>Emergency Contact No: </Text>
            <Text>{user?.emergencyContactNo || "-"} </Text>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text strong>Present Address: </Text>
            <Text>{user?.presentAddress || "-"} </Text>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text strong>Permanent Address: </Text>
            <Text>{user?.permanentAddress || "-"} </Text>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text strong>Role: </Text>
            <Text>{user?.role} </Text>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text strong>Admin Role: </Text>
            <Text>{user?.roleBasedPermission} </Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default dynamic(() => Promise.resolve(UserProfile), { ssr: false });
