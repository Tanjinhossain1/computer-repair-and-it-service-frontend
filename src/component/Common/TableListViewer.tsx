"use client";
import { Table } from "antd";
import React from "react";

interface PaginationConfig {
  pageSize?: number;
  total?: number;
  pageSizeOptions?: number[];
  showSizeChanger?: boolean;
  onChange?: (page: number, pageSize: number) => void;
}

interface TableListViewerPropsType {
  columns: any;
  tableRow: any;
  loading?: boolean;
  paginationConfig?: PaginationConfig;
  onChange?: (pagination: any, filter: any, sorter: any) => void;
}
export default function TableListViewer({
  columns,
  tableRow,
  loading,
  paginationConfig,
  onChange,
}: TableListViewerPropsType) {
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={tableRow}
      pagination={paginationConfig}
      onChange={onChange}
    />
  );
}
