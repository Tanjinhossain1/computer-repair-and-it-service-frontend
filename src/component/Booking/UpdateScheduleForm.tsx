import React from "react";
import Form from "../Forms/Form";
import { Button, Col, Row, message } from "antd";
import FormDatePicker from "../Forms/DatePicker";
import { useUpdateBookingMutation } from "@/redux/api/booked";
import moment from "moment";

export default function UpdateScheduleForm({
  updateData,
}: {
  updateData: any;
}) {
  const [updateBooking] = useUpdateBookingMutation();

  const onSubmit = async (data: any) => {
    console.log("first", data);
    const startDate = moment(data?.startDate).toISOString();
    const endDate = moment(data?.endDate).toISOString();

    message.loading("Updating.....", 1);
    try {
      //   console.log(data);
      await updateBooking({ id: updateData?.id, body: { startDate, endDate } });
      message.success("Update successfully", 1);
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };
  return (
    <Form submitHandler={onSubmit}>
      <Row>
        <Col lg={12}>
          <FormDatePicker value={updateData?.startDate} name="startDate" />
        </Col>

        <Col lg={12}>
          <FormDatePicker value={updateData?.endDate} name="endDate" />
        </Col>
      </Row>
      <Button htmlType="submit" style={{ marginTop: "10px" }} type="primary">
        Submit
      </Button>
    </Form>
  );
}
