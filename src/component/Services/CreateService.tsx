"use client";
import React, { useEffect, useState } from "react";
import Form from "../Forms/Form";
import { Button, Col, Row, message } from "antd";
import FormInput from "../Forms/FormInput";
import FormTextArea from "../Forms/FormTextArea";
import UploadImageField from "../Forms/UploadImage";
import { useCreateServiceMutation } from "@/redux/api/service";
import { yupResolver } from "@hookform/resolvers/yup";
import serviceSchema from "@/schemas/service";
import FormSelectField from "../Forms/FormSelectField";

export default function CreateService() {
  const [unFormatFile, setUnFormatFile] = useState<any>(null);
  const [image, setImage] = useState<string | null>("");
  const [createService] = useCreateServiceMutation();
  useEffect(() => {
    if (unFormatFile) {
      const fileData = new FormData();
      fileData.append("file", unFormatFile);
      fileData.append("upload_preset", "computer-services");
      fileData.append("cloud_name", "djvcnudls");

      fetch("https://api.cloudinary.com/v1_1/djvcnudls/image/upload", {
        method: "POST",
        body: fileData,
      })
        .then((res) => res.json())
        .then((fileRepsData) => {
          if (fileRepsData?.url) {
            setImage(fileRepsData?.url);
          }
          console.log("image fileRepsData  ", fileRepsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [unFormatFile]);

  const onSubmit = (data: any) => {
    console.log("service  ", data);
    setTimeout(async () => {
      console.log(data);
      message.loading("Creating.....", 1);
      const body = {
        ...data,
        price: +data?.price,
        rating: +data?.rating,
        image,
      };
      try {
        await createService({ body });
        message.success("Service Create successfully", 1);
      } catch (err: any) {
        message.error(err.message);
      }
    }, 500);
  };
  return (
    <Form isReset resolver={yupResolver(serviceSchema)} submitHandler={onSubmit}>
      <Row gutter={16}>
        <Col xs={24} sm={6}>
          <FormInput label="Title" name="title" />
        </Col>
        <Col xs={24} sm={6}>
          <FormInput type="number" label="Price" name="price" />
        </Col>
        <Col xs={24} sm={6}>
        <FormSelectField
            size="large"
            name="status"
            options={[{ label: "available", value: "available" },{label:"up-coming",value:"up-coming"}]}
            label="Status"
            placeholder="Select" 
          /> 
        </Col>
        <Col xs={24} sm={6}>
          <FormInput label="Category" name="category" />
        </Col>
        <Col xs={24} sm={6}>
          <FormInput type="number" label="Rating" name="rating" />
        </Col>
        <Col xs={24} sm={6}>
          <FormTextArea rows={2} label="Description" name="description" />
        </Col>
        <Col xs={24} sm={6}>
          <UploadImageField
            runAfterChange={(file) => setUnFormatFile(file)}
            name="image"
          />
        </Col>
      </Row>
      <div style={{ textAlign: "end" }}>
        <Button type="primary" htmlType="submit">
          Create Service
        </Button>
      </div>
    </Form>
  );
}
