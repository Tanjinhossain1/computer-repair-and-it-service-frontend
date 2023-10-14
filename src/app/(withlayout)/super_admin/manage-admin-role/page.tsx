"use client";
import TableListViewer from "@/component/Common/TableListViewer";
import UMBreadCrumb from "@/component/Common/UMBreadCrumb";
import { useAllUserQuery, useDeleteTheUserMutation } from "@/redux/api/userApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
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
import { useAddAdminMutation, useAddAdminRoleMutation, useAdminsQuery } from "@/redux/api/admin";
import RegisterForm from "@/component/Register";
import Form from "@/component/Forms/Form";
import FormInput from "@/component/Forms/FormInput";

const AdminRoleForm =  ({id}:{id: any}) => {
    const [addAdminRole] = useAddAdminRoleMutation();

    const onSubmit = async (data: {roleBasedPermission: string}) =>{
        console.log('first id ',id,data)
        message.loading("Adding.....", 1);
        console.log(data)
    try { 
      await addAdminRole({ id, body: data });
      message.success("Role Add successfully", 1);
    } catch (err: any) { 
      message.error(err.message);
    }
    }
  return (
    <div>
      <Form submitHandler={onSubmit}>
        <FormInput type="text" name="roleBasedPermission" size="large" placeholder="Give Role" />
        <br />
        <br />
        <Button type="primary" htmlType="submit">Add Role</Button>
      </Form>
    </div>
  );
};

export default function ManageAdminRole() {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};
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

  const deleteAdmin = async (id: number) => {
    message.loading("Deleting.....", 1);
    try {
      await deleteTheUser({ id });
      message.success("Deleted successfully", 1);
    } catch (err: any) {
      message.error(err.message);
    }
  };
  const { data, isLoading } = useAdminsQuery({ ...query });
  //@ts-ignore
  const admin: IUser[] = data?.admins;
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
      title: "Role",
      dataIndex: "roleBasedPermission",
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
            <Popover
              content={
                <AdminRoleForm
                 id={data}
                />
              } 
              trigger="click"
            >
              <Button type="primary">
                Add Admin Role
              </Button>
            </Popover>
            <Button onClick={() => deleteAdmin(data)} type="primary" danger>
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
            label: `manage-admin-role`,
            link: `/${role}/manage-admin-role`,
          },
        ]}
      />
      <div>
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
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
      <h1 style={{ textAlign: "center" }}>List Of User For Make Admin </h1>
      <div style={{ margin: "10px" }}>
        <TableListViewer
          loading={isLoading}
          columns={columns}
          tableRow={admin}
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

