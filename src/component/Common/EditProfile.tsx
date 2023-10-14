import { Button, Card, Col, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import { IUser } from "@/types";
import FormDatePicker from "../Forms/DatePicker";
import FormSelectField from "../Forms/FormSelectField";
import UploadImageField from "../Forms/UploadImage";
import { useUpdateProfileMutation } from "@/redux/api/userApi";

export const bloodGroupOptions = [
  {
    label: "A+",
    value: "A+",
  },
  {
    label: "A-",
    value: "A-",
  },
  {
    label: "B+",
    value: "B+",
  },
  {
    label: "B-",
    value: "B-",
  },
  {
    label: "AB+",
    value: "AB+",
  },
  {
    label: "AB-",
    value: "AB-",
  },
  {
    label: "O+",
    value: "O+",
  },
  {
    label: "O-",
    value: "O-",
  },
];
export default function EditProfile({ data , setOpenPopover}: { data: any,setOpenPopover:any }) {
  const [unFormatFile, setUnFormatFile] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(data?.profileImage);
  const [updateProfile] = useUpdateProfileMutation();

  useEffect(()=>{
    if(unFormatFile){ 
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
                }
                console.log("image fileRepsData  ", fileRepsData);
              })
              .catch((err) => {
                console.log(err);
              }); 
    }
  },[unFormatFile])
  const handleSubmit = async (submitData: any) => {
  setTimeout( async () => {
    console.log(submitData); 
    message.loading("Updating.....", 1);
    const body = {
        ...submitData,
        profileImage
    }
    console.log('body ',body)
    try {
      await updateProfile({ id: data?.id, body });
      message.success("Profile Updated successfully", 1); 
      setOpenPopover(false)
    } catch (err: any) {
      message.error(err.message);
    }
  }, 500);
  };
  return (
    <div>
      <div style={{ padding: "16px" }}>
        <Card title="Edit Profile">
          <Form submitHandler={handleSubmit}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormInput
                  value={data?.firstName}
                  label="First Name"
                  name="firstName"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormInput
                  value={data?.middleName}
                  label="Middle Name"
                  name="middleName"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormInput
                  value={data?.lastName}
                  label="Last Name"
                  name="lastName"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormDatePicker
                  label="Date of Birth"
                  value={data?.dateOfBirth}
                  name="dateOfBirth"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormInput value={data?.gender} label="Gender" name="gender" />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormSelectField
                  size="large"
                  name="bloodGroup"
                  options={bloodGroupOptions}
                  value={data?.bloodGroup}
                  label="Blood group"
                  placeholder="Select"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormInput
                  value={data?.contactNo}
                  label="Contact No"
                  name="contactNo"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormInput
                  value={data?.emergencyContactNo}
                  label="Emergency Contact No"
                  name="emergencyContactNo"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormInput
                  value={data?.presentAddress}
                  label="Present Address"
                  name="presentAddress"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <FormInput
                  value={data?.permanentAddress}
                  label="Permanent Address"
                  name="permanentAddress"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <UploadImageField runAfterChange={(file)=>setUnFormatFile(file)} name="profileImage" />
              </Col>
            </Row>
            <Row justify="center">
              <Col>
                <Button
                  style={{ marginTop: "20px" }}
                  type="primary"
                  htmlType="submit"
                >
                  Save Profile Details
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </div>
  );
}
