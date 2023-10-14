import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined, 
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/profile`}>Account Profile</Link>,
          key: `/${role}/profile`,
        }, 
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/manage-user`}>Manage Users</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-user`,
    }, 
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: "Manage Activities",
      key: "manage-activities",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/user`}>User</Link>,
          key: `/${role}/user`,
        },
        {
          label: <Link href={`/${role}/service`}>Services</Link>,
          key: `/${role}/service`,
        },
        {
          label: <Link href={`/${role}/service-management`}>Services-Management</Link>,
          key: `/${role}/service-management`,
        },
      ],
    },
    {
      label: "Booking Management",
      key: "booking-management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/booked-services`}>Booked Services</Link>,
          key: `/${role}/booked-services`,
        },
        {
          label: <Link href={`/${role}/update-booked-services`}>Update Booked Services</Link>,
          key: `/${role}/update-booked-services`,
        }, 
      ],
    },
    {
      label: "Content Management",
      key: "content-management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/blog-post`}>Blog-Posts</Link>,
          key: `/${role}/blog-post`,
        },
        {
          label: <Link href={`/${role}/faqs`}>FAQs.</Link>,
          key: `/${role}/faqs`,
        }, 
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems, 
    {
      label: <Link href={`/${role}/create-admin`}>Make Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/create-admin`,
    },
    {
      label: <Link href={`/${role}/manage-admin-role`}>Manage Admin Role</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-admin-role`,
    },  
    
  ]; 

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else {
    return defaultSidebarItems;
  }
};