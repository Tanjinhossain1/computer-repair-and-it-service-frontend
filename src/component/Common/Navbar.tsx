"use client";
import React from "react";
import {
  Avatar,
  Button,
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
        background: `linear-gradient(45deg, #0072ff, #00c6ff)`,
      }}
    >

      <Row justify={"end"} align={"middle"}>
      {
        role ? null : 
      <>
      <Space style={{ marginRight: 10, fontWeight: 600, color: "white" }}>
         <Link style={{color: 'white'}} href='/login'>Login</Link> 
      </Space>

      <Space style={{ marginRight: 10, fontWeight: 600, color: "white" }}> 
         <Link style={{color: 'white'}} href='/register'>Register</Link>
      </Space>
      </>
    }

        <Space style={{ marginRight: 10, fontWeight: 600, color: "white" }}>
          {TrimToUpperCaseWithSpace(role)}
        </Space>
        <Dropdown menu={{ items }}>
          <p>
            <Avatar size="large" icon={<UserOutlined />} />
          </p>
        </Dropdown>
      </Row>
    </AntHeader>
  );
}
