"use client";
import { Layout } from "antd"; 
import NavbarComponent from "./Navbar";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const base = "admin";
  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <NavbarComponent /> 
      {children}
    </Content>
  );
};

export default Contents;