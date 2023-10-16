"use client";
import Form from "@/component/Forms/Form";
import FormInput from "@/component/Forms/FormInput";
import FormTextArea from "@/component/Forms/FormTextArea";
import UploadImageField from "@/component/Forms/UploadImage";
import { useCreateBlogPostMutation } from "@/redux/api/blogPost";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CreateBlogPost() {
  const history = useRouter();
  const [createBlogPost] = useCreateBlogPostMutation();
  const [unFormatFile, setUnFormatFile] = useState<any>(null);
  const [image, setProfileImage] = useState<string | null>("");
  const [waiting,setWaiting] = useState<boolean>(false)
  useEffect(() => {
    if (unFormatFile) {
      setWaiting(true)
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
            setProfileImage(fileRepsData?.url);
            setWaiting(false)
          }
          console.log("image fileRepsData  ", fileRepsData);
        })
        .catch((err) => {
          setWaiting(false)
          console.log(err);
        }); 
    }
  }, [unFormatFile]);

  const onSubmit = async (data: any) => {
    console.log("blog ", data);

    setTimeout(async () => {
      message.loading("Creating.....", 1);
      try {
        const body = {
          ...data,
          image,
        };
        //   console.log(data);
        await createBlogPost({ body });
        message.success("Create successfully", 1);
        history.push("/admin/blog-post");
      } catch (err: any) {
        //   console.error(err.message);
        message.error(err.message);
      }
    }, 1000);
  };
  return (
    <Form style={{ margin: "30px" }} submitHandler={onSubmit}>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <FormInput placeholder="title" label="Title" name="title" />
        </Col>
        <Col xs={24} sm={12}>
          <FormInput
            placeholder="short description"
            label="Top Short Description"
            name="topShortDescription"
          />
        </Col>
        <Col xs={24} sm={12}>
          <FormTextArea
            rows={5}
            placeholder="description"
            label="Description"
            name="description"
          />
        </Col>
        <Col style={{ marginTop: "20px" }} xs={24} sm={12}>
          <UploadImageField
            runAfterChange={(file) => {
              setWaiting(true)
              setUnFormatFile(file)
            }}
            name="image"
          />
        </Col>
      </Row>
      <Button
        style={{ marginTop: "20px", textAlign: "center" }}
        type="primary"
        htmlType="submit"
        disabled={waiting}
      >
        Submit
      </Button>
    </Form>
  );
}
