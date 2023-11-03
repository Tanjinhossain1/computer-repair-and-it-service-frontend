"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Row,
  Space,
  theme,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserInfo, removeLocalStorageInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import { TrimToUpperCaseWithSpace } from "@/utils/utils";
import Link from "next/link";

const { Header: AntHeader, Content, Footer } = Layout;

export default function NavbarComponent() {
  const router = useRouter();
  const logOut = () => {
    removeLocalStorageInfo(authKey);
    router.push("/login");
  }; 
  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];

  const { role } = getUserInfo() as any;
 
  return (
    <AntHeader
      style={{
        background: `#A555EC`,
        position: "sticky",
        top: 0,
        zIndex: "100",  
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', 
      }} 
    >
      <Row justify={"end"} align={"middle"}>
        <Col
          lg={1}
          style={{ marginRight: 10, fontWeight: 600, color: "white" }}
        >
          <Link style={{ color: "white" }} href="/">
            Home
          </Link>
        </Col>

        {role && role === "user" ? (
          <>
            <Col
              lg={1}
              style={{ marginRight: 10, fontWeight: 600, color: "white" }}
            >
              <Link style={{ color: "white" }} href="/user-profile">
                Profile
              </Link>
            </Col>

            <Col
              lg={1.4}
              style={{ marginRight: 10, fontWeight: 600, color: "white" }}
            >
              <Link style={{ color: "white" }} href="/add-to-cart">
                AddToCart
              </Link>
            </Col>

            <Col
              lg={1.5}
              style={{ marginRight: 10, fontWeight: 600, color: "white" }}
            >
              <Link style={{ color: "white" }} href={`/${role}/profile`}>
                Dashboard
              </Link>
            </Col>
          </>
        ) : null}
        {role ? null : (
          <>
            <Col
              lg={1}
              style={{ marginRight: 10, fontWeight: 600, color: "white" }}
            >
              <Link style={{ color: "white" }} href="/login">
                Login
              </Link>
            </Col>

            <Col
              lg={1}
              style={{ marginRight: 10, fontWeight: 600, color: "white" }}
            >
              <Link style={{ color: "white" }} href="/register">
                Register
              </Link>
            </Col>
          </>
        )}
        {role === "super_admin" || role === "admin" ? (
          <Col
            lg={3}
            style={{ marginRight: 10, fontWeight: 600, color: "white" }}
          >
            <Link style={{ color: "white" }} href={`${role}/profile`}>
              Dashboard
            </Link>
          </Col>
        ) : null}
        <Col
          lg={role === "super_admin" ? 3 : 1.5}
          style={{ marginRight: 10, fontWeight: 600, color: "white" }}
        >
          {TrimToUpperCaseWithSpace(role === "user" ? "ME" : role)}
        </Col>
        {role ? (
          <Dropdown menu={{ items }}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        ) : null}
      </Row>
    </AntHeader>
  );
}
