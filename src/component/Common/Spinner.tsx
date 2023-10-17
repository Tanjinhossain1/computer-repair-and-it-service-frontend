import { Spin } from "antd";
import React from "react";

export default function Spinner() {
  return (
    <div>
      <Spin style={{ marginTop: "200px" }} tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </div>
  );
}
