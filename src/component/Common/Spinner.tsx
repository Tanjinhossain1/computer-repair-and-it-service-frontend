import { Spin } from "antd";
import React from "react";

export default function Spinner({color}:{color?:string}) {
  return (
    <div>
      <Spin style={{ marginTop: "200px",color: color? color:""}} tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </div>
  );
}
