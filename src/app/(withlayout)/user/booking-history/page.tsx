'use client'
import TableListViewer from '@/component/Common/TableListViewer';
import UMBreadCrumb from '@/component/Common/UMBreadCrumb';
import { authKey } from '@/constants/storageKey';
import { useBookedServiceQuery, useDeleteBookedServiceMutation } from '@/redux/api/booked';
import { useDebounced } from '@/redux/hooks';
import { getUserInfo, removeLocalStorageInfo } from '@/services/auth.service';
import { IBooked, IMeta } from '@/types';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Popover, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import dayjs from 'dayjs'

export default function BookingHistoryPage() {
  const { role,userId } = getUserInfo() as any;
  const history = useRouter();
  if (role !== "user") {
    removeLocalStorageInfo(authKey);
    history.push("/login");
  }
  const query: Record<string, any> = {};
  const [deleteBookedService] = useDeleteBookedServiceMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>(""); 

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
 

  const deleteTheBookedService = async (id: number) => {
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
  const { data, isLoading } = useBookedServiceQuery({ arg:  {...query}, userId: userId });
  //@ts-ignore
  const bookedServices: IBooked[] = data?.bookedServices;
  const meta: IMeta | undefined = data?.meta;
  const columns = [ 
    {
      title: "Service",
      dataIndex: "service",
      render: function (data: Record<string, string>) {
        
        return <>{data?.title}</>;
      },
    },
    {
      title: "Price",
      dataIndex: "service",
      render: function (data: Record<string, string>) {
        return <>{data?.price}</>;
      },
    },
    {
      title: "Category",
      dataIndex: "service",
      render: function (data: Record<string, string>) {
        return <>{data?.category}</>;
      },
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
      title: "Service Location ",
      dataIndex: "service",
      render: function (data: any) {
        return  <>{data?.serviceLocation}</>
      },
      
    }, 
    {
      title: "Service Status ",
      dataIndex: "service",
      render: function (data: any) {
        return <>{data?.status}</>
      },
      
    }, 
    {
      title: "Action",
      dataIndex: "",

      render: function (data: any) {
        return (
          <>  

            <Button onClick={() => deleteTheBookedService(data?.id)} type="primary" danger>
             Cancel Service
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
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}/profile`,
          },
          {
            label: `booking-history`,
            link: `/${role}/booking-history`,
          },
        ]}
      /> 
      <h1 style={{ textAlign: "center" }}>List Of Booked Services </h1>
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
