"use client";
import TableListViewer from "@/component/Common/TableListViewer";
import UMBreadCrumb from "@/component/Common/UMBreadCrumb";
import { useAllUserQuery, useDeleteTheUserMutation } from "@/redux/api/userApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo, removeLocalStorageInfo } from "@/services/auth.service";
import { IMeta, IUser } from "@/types";
import { TrimToUpperCase } from "@/utils/utils";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input, Popover, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useAddAdminMutation } from "@/redux/api/admin";
import RegisterForm from "@/component/Register";
import { useRouter } from "next/navigation";
import { authKey } from "@/constants/storageKey";

export default function CreateAdmins() {
  const { role } = getUserInfo() as any;
  const history = useRouter()
  if(role !== "super_admin"){
    removeLocalStorageInfo(authKey);
    history.push("/login");
  }
  const query: Record<string, any> = {};
  const [addAdmin] = useAddAdminMutation();
  const [deleteTheUser] = useDeleteTheUserMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const onAddAdmin = async (id: number) => {
    message.loading("Updating.....", 1);
    try {
      //   console.log(data);
      await addAdmin({ id, body: { role: "admin" } });
      message.success("Admin Created successfully", 1);
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };
  const deleteUser = async (id: number) => {
    message.loading("Deleting.....", 1);
    try {
      //   console.log(data);
      await deleteTheUser({ id });
      message.success("Deleted successfully", 1);
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };
  const { data, isLoading } = useAllUserQuery({ ...query });
  //@ts-ignore
  const user: IUser[] = data?.users;
  const meta: IMeta | undefined = data?.meta;
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "",

      render: function (data: Record<string, string>) {
        const fullName = `${data?.firstName} ${
          data?.middleName ? data?.middleName : ""
        } ${data?.lastName}`;
        return <>{fullName}</>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created at",
      dataIndex: "createAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Contact no.",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      dataIndex: "id",

      render: function (data: any) {
        return (
          <>
            <Button onClick={() => onAddAdmin(data)} type="primary">
              Add Admin
            </Button>

            <Button onClick={() => deleteUser(data)} type="primary" danger>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };
  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}/profile`,
          },
          {
            label: `create-admin`,
            link: `/${role}/create-admin`,
          },
        ]}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div style={{ marginRight: "40px" }}>
          <Popover content={<RegisterForm role="admin" redirect="/super_admin/create-admin" />}   trigger="click">
            <Button type="primary">Create Admin With Form</Button>
          </Popover>

          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </div>
      <h1 style={{textAlign:'center'}}>List Of User For Make Admin </h1>
     <div style={{margin: "10px"}}>
     <TableListViewer
        loading={isLoading}
        columns={columns}
        tableRow={user}
        paginationConfig={{
          onChange: onPaginationChange,
          pageSize: size,
          total: meta?.total,
          showSizeChanger: true,
          pageSizeOptions: [15, 25, 35, 50],
        }}
        onChange={onTableChange}
      />
     </div>
    </div>
  );
}
