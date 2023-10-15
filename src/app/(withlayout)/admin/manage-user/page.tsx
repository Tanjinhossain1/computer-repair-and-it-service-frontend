"use client";
import { authKey } from "@/constants/storageKey";
import { useAllUserQuery, useDeleteTheUserMutation } from "@/redux/api/userApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo, removeLocalStorageInfo } from "@/services/auth.service";
import { IMeta } from "@/types";
import { Button, Input, Popover, message } from "antd";
import dayjs from "dayjs";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import UMBreadCrumb from "@/component/Common/UMBreadCrumb";
import { useState } from "react";
import RegisterForm from "@/component/Register";
import TableListViewer from "@/component/Common/TableListViewer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EditProfile from "@/component/Common/EditProfile";

export default function UserManagePage() {
  const { role } = getUserInfo() as any;
  const history = useRouter();
  if (role !== "admin") {
    removeLocalStorageInfo(authKey);
    history.push("/login");
  }
  const query: Record<string, any> = {};
  const [deleteTheUser] = useDeleteTheUserMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openPopover, setOpenPopover] = useState<boolean>(false);

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
      dataIndex: "",

      render: function (data: any) {
        return (
          <> 
            <Popover key={data?.id} trigger={'click'} content={<EditProfile setOpenPopover={setOpenPopover} data={data} />}>
              <Button  type="primary">
                <EditOutlined />
              </Button>
            </Popover>

            <Button onClick={() => deleteUser(data?.id)} type="primary" danger>
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
            label: `manage-user`,
            link: `/${role}/manage-user`,
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
          <Popover
            content={
              <RegisterForm
                isPopover
                role="user"
                redirect="/admin/manage-user"
              />
            }
            trigger="click"
          >
            <Button type="primary">Create User</Button>
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
      <h1 style={{ textAlign: "center" }}>List Of User For Manage </h1>
      <div style={{ margin: "10px" }}>
        <TableListViewer
          loading={isLoading}
          columns={columns}
          tableRow={user}
          paginationConfig={{
            onChange: onPaginationChange,
            pageSize: size,
            total: meta?.total,
            showSizeChanger: true,
            pageSizeOptions: [10, 15, 25, 35, 50],
          }}
          onChange={onTableChange}
        />
      </div>
    </div>
  );
}
