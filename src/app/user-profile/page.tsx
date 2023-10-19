"use client";
import { useGetProfileDetailQuery } from "@/redux/api/userApi";
import { getUserInfo, removeLocalStorageInfo } from "@/services/auth.service";
import { Typography } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authKey } from "@/constants/storageKey";
import dynamic from "next/dynamic";
import UserProfileComponent from "@/component/Common/UserProfile";
import NavbarComponent from "@/component/Common/Navbar";

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
  return (
    <div>
      <NavbarComponent />
      <UserProfileComponent />;
    </div>
  );
}

export default dynamic(() => Promise.resolve(UserProfile), { ssr: false });
