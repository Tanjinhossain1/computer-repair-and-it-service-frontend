"use client";
import { authKey } from "@/constants/storageKey";
import { getUserInfo, removeLocalStorageInfo } from "@/services/auth.service";
import { IBooked, IMeta, IUser } from "@/types";
import { Button, Col, Popover, Row, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
import UMBreadCrumb from "@/component/Common/UMBreadCrumb";
import TableListViewer from "@/component/Common/TableListViewer";
import {
  useBookedServicesQuery,
  useDeleteBookedServiceMutation,
  useUpdateBookingMutation,
} from "@/redux/api/booked";
import Form from "@/component/Forms/Form";
import FormDatePicker from "@/component/Forms/DatePicker";
import UpdateScheduleForm from "@/component/Booking/UpdateScheduleForm";

export default function BookedServices() {
  const { role } = getUserInfo() as any;
  const history = useRouter();
  if (role !== "admin") {
    removeLocalStorageInfo(authKey);
    history.push("/login");
  }
  const [deleteBookedService] = useDeleteBookedServiceMutation();
  const [updateBooking] = useUpdateBookingMutation();
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const deleteBooked = async (id: number) => {
    message.loading("Deleting.....", 1);
    try {
      //   console.log(data);
      await deleteBookedService({ id });
      message.success("Deleted successfully", 1);
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const UpdateBook = async (id: number, updateFieldData: any) => {
    message.loading("Updated.....", 1);
    try {
      //   console.log(data);
      await updateBooking({ id, body: updateFieldData });
      message.success("Update successfully", 1);
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const { data, isLoading } = useBookedServicesQuery({ ...query });
  //@ts-ignore
  const bookedServices: IBooked[] = data?.bookedServices;
  const meta: IMeta | undefined = data?.meta;
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Title",
      dataIndex: "service",
      render: function (data: any) {
        return data.title;
      },
    },
    {
      title: "Status",
      dataIndex: "bookStatus",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
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
            <Button
              onClick={() => UpdateBook(data?.id, { bookStatus: "reject" })}
              type="primary"
              danger
            >
              Reject
            </Button>

            <Button
              style={{ marginLeft: "10px", marginRight: "10px" }}
              onClick={() => UpdateBook(data?.id, { bookStatus: "accept" })}
              type="primary"
            >
              Accept
            </Button>

            <Popover
              key={data?.id}
              trigger={"click"}
              content={<UpdateScheduleForm updateData={data} />}
            >
              <Button htmlType="submit" type="primary">Change Schedule</Button>
            </Popover>

            <Button
            style={{marginLeft:"10px"}}
              onClick={() => deleteBooked(data?.id)}
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
            label: `booked-service`,
            link: `/${role}/booked-service`,
          },
        ]}
      />

      <h1 style={{ textAlign: "center" }}>
        List Of Booking Service For Manage{" "}
      </h1>
      <div style={{ margin: "10px" }}>
        <TableListViewer
          loading={isLoading}
          columns={columns}
          tableRow={bookedServices}
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
