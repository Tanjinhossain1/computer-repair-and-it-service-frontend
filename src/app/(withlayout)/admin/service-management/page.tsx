"use client";
import TableListViewer from "@/component/Common/TableListViewer";
import UMBreadCrumb from "@/component/Common/UMBreadCrumb";
import CreateService from "@/component/Services/CreateService";
import { authKey } from "@/constants/storageKey";
import {
  useAvailableServiceQuery,
  useDeleteServiceMutation,
  useServicesQuery,
  useUpComingServiceQuery,
} from "@/redux/api/service";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo, removeLocalStorageInfo } from "@/services/auth.service";
import { IMeta, IService } from "@/types";
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
import EditService from "../service/[id]/page";
import EditServiceComponent from "@/component/Services/EditService";

export default function ServiceManagement() {
  const { role } = getUserInfo() as any;
  const history = useRouter();
  if (role !== "admin") {
    removeLocalStorageInfo(authKey);
    history.push("/login");
  }
  // for available
  const query: Record<string, any> = {};
  const [deleteService] = useDeleteServiceMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  // for up coming
  const query1: Record<string, any> = {};
  const [page1, setPage1] = useState<number>(1);
  const [size1, setSize1] = useState<number>(10);
  const [sortBy1, setSortBy1] = useState<string>("");
  const [sortOrder1, setSortOrder1] = useState<string>("");
  const [searchTerm1, setSearchTerm1] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  query1["limit"] = size1;
  query1["page"] = page1;
  query1["sortBy"] = sortBy1;
  query1["sortOrder"] = sortOrder1;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const debouncedSearchTerm1 = useDebounced({
    searchQuery: searchTerm1,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query1["searchTerm"] = debouncedSearchTerm1;
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
  const { data, isLoading } = useAvailableServiceQuery({ ...query });
  const { data: data1, isLoading: isLoading1 } = useUpComingServiceQuery({
    ...query1,
  });
  //@ts-ignore
  const services: IService[] = data?.services;
  const meta: IMeta | undefined = data?.meta;

  //@ts-ignore
  const services1: IService[] = data1?.services;
  const meta1: IMeta | undefined = data1?.meta;
   
  const columns = [ 
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
      title: "Category",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
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
      title: "Manage",
      dataIndex: "",
      render: function (data: any) {
        return (
          <>
           <Popover
            style={{ width: "60%" }}
            content={<EditServiceComponent peram={data} showOnlyPrice />}
            trigger="click"
          >
            <Button type="primary">Price</Button>
          </Popover>
            {
                data?.status === "up-coming" ?  <Popover
                style={{ width: "60%" }}
                content={<EditServiceComponent peram={data} showOnlyStatus />}
                trigger="click"
              >
                <Button style={{marginLeft:"10px"}} type="primary">Available</Button>
              </Popover> : null
            } 
              <Popover
            style={{ width: "60%" }}
            content={<EditServiceComponent peram={data} showOnlyDescription />}
            trigger="click"
          >
            <Button style={{marginLeft:"10px"}}  type="primary">Description</Button>
          </Popover>
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

  const onPaginationChange1 = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage1(page);
    setSize1(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const onTableChange1 = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy1(field as string);
    setSortOrder1(order === "ascend" ? "asc" : "desc");
  };
  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  const resetFilters1 = () => {
    setSortBy1("");
    setSortOrder1("");
    setSearchTerm1("");
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
            link: `/${role}/service-management`,
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
      <h1 style={{ textAlign: "center" }}>List Of Available </h1>
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

      <h1 style={{ textAlign: "center" }}>List Of UP Coming Services </h1>

      <div style={{ width: "100%" }}>
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm1(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        {(!!sortBy1 || !!sortOrder1 || !!searchTerm1) && (
          <Button
            style={{ margin: "0px 5px" }}
            type="primary"
            onClick={resetFilters1}
          >
            <ReloadOutlined />
          </Button>
        )}
      </div>
      <div style={{ margin: "10px" }}>
        <TableListViewer
          loading={isLoading1}
          columns={columns}
          tableRow={services1}
          paginationConfig={{
            onChange: onPaginationChange1,
            pageSize: size1,
            total: meta1?.total,
            showSizeChanger: true,
            pageSizeOptions: [15, 25, 35, 50],
          }}
          onChange={onTableChange1}
        />
      </div>
    </div>
  );
}
