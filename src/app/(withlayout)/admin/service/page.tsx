"use client";
import TableListViewer from "@/component/Common/TableListViewer";
import UMBreadCrumb from "@/component/Common/UMBreadCrumb";
import CreateService from "@/component/Services/CreateService";
import { authKey } from "@/constants/storageKey";
import {
  useDeleteServiceMutation,
  useServicesQuery,
} from "@/redux/api/service";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo, removeLocalStorageInfo } from "@/services/auth.service";
import { IMeta } from "@/types";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input, Popover, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";

export default function ServicePage() {
  const { role } = getUserInfo() as any;
  const history = useRouter();
  if (role !== "admin") {
    removeLocalStorageInfo(authKey);
    history.push("/login");
  }
  const query: Record<string, any> = {};
  const [deleteService] = useDeleteServiceMutation();
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

  const deleteTheService = async (id: number) => {
    message.loading("Deleting.....", 1);
    try {
      await deleteService({ id });
      message.success("Deleted successfully", 1);
    } catch (err: any) {
      message.error(err.message);
    }
  };
  const { data, isLoading } = useServicesQuery({ ...query });
  //@ts-ignore
  const services: IUser[] = data?.services;
  const meta: IMeta | undefined = data?.meta;
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
    },
    {
      title: "Location",
      dataIndex: "serviceLocation",
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Rating",
      dataIndex: "rating",
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
      title: "Action",
      dataIndex: "",  
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/service/${data?.id}`}>
              <Button type="primary">
                <EditOutlined />
              </Button>
            </Link>

            <Button
              onClick={() => deleteTheService(data?.id)}
              type="primary"
              danger
            >
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
            label: `service`,
            link: `/${role}/service`,
          },
        ]}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "100%" }}>
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
        <div>
          <Popover
            style={{ width: "60%" }}
            content={<CreateService />}
            trigger="click"
          >
            <Button type="primary">Create Service</Button>
          </Popover>
        </div>
      </div>
      <h1 style={{ textAlign: "center" }}>List Of Services </h1>
      <div style={{ margin: "10px" }}>
        <TableListViewer
          loading={isLoading}
          columns={columns}
          tableRow={services}
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
