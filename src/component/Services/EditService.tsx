"use client";
import React, { useEffect, useState } from "react";
import Form from "../Forms/Form";
import { Button, Col, Row, message } from "antd";
import FormInput from "../Forms/FormInput";
import FormTextArea from "../Forms/FormTextArea";
import UploadImageField from "../Forms/UploadImage";
import { useUpdateServiceMutation } from "@/redux/api/service";
import FormSelectField from "../Forms/FormSelectField";
import { useRouter } from "next/navigation";

export default function EditServiceComponent({
  peram,
  showOnlyPrice,
  showOnlyStatus,
  showOnlyDescription,
}: {
  peram: any;
  showOnlyPrice?: boolean;
  showOnlyStatus?: boolean;
  showOnlyDescription?: boolean;
}) {
  const history = useRouter();
  const [unFormatFile, setUnFormatFile] = useState<any>(null);
  const [image, setImage] = useState<string | null>(
    peram?.image ? peram?.image : ""
  );
  const [updateService] = useUpdateServiceMutation();
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
      message.loading("Updating.....", 1);
      const body = showOnlyPrice
        ? {
            price: +data?.price,
          }
        : showOnlyStatus
        ? {
            status: data?.status,
          }
        : showOnlyDescription
        ? {
            description: data?.description,
          }
        : {
            ...data,
            price: +data?.price,
            rating: +data?.rating,
            image,
          };
      try {
        await updateService({ id: peram.id, body });
        message.success("Service Update successfully", 1);
        if (!showOnlyPrice) {
          if (!showOnlyStatus) {
            if (!showOnlyDescription) {
              history.back();
            }
          }
        }
      } catch (err: any) {
        message.error(err.message);
      }
    }, 500);
  };
  return (
    <Form submitHandler={onSubmit}>
      {showOnlyPrice ? (
        <FormInput
          style={{ width: "100%", marginBottom: "5px" }}
          value={peram?.price}
          type="number"
          label="Price"
          name="price"
        />
      ) : showOnlyStatus ? (
        <FormSelectField
          size="large"
          name="status"
          options={[{ label: "available", value: "available" }]}
          label="Status"
          placeholder="Select"
          value={peram?.status}
        />
      ) : showOnlyDescription ? (
        <FormTextArea
          value={peram?.description}
          rows={5}
          label="Description"
          name="description"
        />
      ) : (
        <Row gutter={16}>
          <Col xs={24} sm={6}>
            <FormInput value={peram?.title} label="Title" name="title" />
          </Col>
          <Col xs={24} sm={6}>
            <FormInput
              value={peram?.price}
              type="number"
              label="Price"
              name="price"
            />
          </Col>
          <Col xs={24} sm={6}>
            <FormSelectField
              size="large"
              name="status"
              options={[
                { label: "available", value: "available" },
                { label: "up-coming", value: "up-coming" },
              ]}
              label="Status"
              placeholder="Select"
              value={peram?.status}
            />
          </Col>
          <Col xs={24} sm={6}>
            <FormInput
              value={peram?.category}
              label="Category"
              name="category"
            />
          </Col>
          <Col xs={24} sm={6}>
            <FormInput
              value={peram?.rating}
              type="number"
              label="Rating"
              name="rating"
            />
          </Col>
          <Col xs={24} sm={6}>
            <FormTextArea
              value={peram?.description}
              rows={2}
              label="Description"
              name="description"
            />
          </Col>
          <Col xs={24} sm={6}>
            <UploadImageField
              runAfterChange={(file) => setUnFormatFile(file)}
              name="image"
            />
          </Col>
        </Row>
      )}
      <div style={{ textAlign: "end" }}>
        <Button type="primary" htmlType="submit">
          Update {showOnlyPrice ? "Price" : "Service"}
        </Button>
      </div>
    </Form>
  );
}
