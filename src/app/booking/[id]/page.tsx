"use client";
import NavbarComponent from "@/component/Common/Navbar";
import FormDatePicker from "@/component/Forms/DatePicker";
import Form from "@/component/Forms/Form";
import { authKey } from "@/constants/storageKey";
import {
  useCreateBookingMutation,
  useCreateReviewMutation,
  useHaveBookedServiceQuery,
  useReviewsQuery,
} from "@/redux/api/booked";
import { useServiceQuery } from "@/redux/api/service";
import { getUserInfo, removeLocalStorageInfo } from "@/services/auth.service";
import { Avatar, Button, Card, Divider, Popover, message } from "antd";
import moment from "moment";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { BackwardOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import Spinner from "@/component/Common/Spinner";
import FormTextArea from "@/component/Forms/FormTextArea";
import FormInput from "@/component/Forms/FormInput";
import Meta from "antd/es/card/Meta";

function Booked() {
  const { role, userId } = getUserInfo() as any;
  const history = useRouter();
  setTimeout(() => {
    if (role !== "user" ) {
      removeLocalStorageInfo(authKey);
      history.push("/login");
    }
  }, 1000);
  const { id } = useParams();
  const { data, isLoading } = useServiceQuery({ id });
  const { data: reviews, isLoading: isLoading2 } = useReviewsQuery({id: id});

  const { data: isAlreadyBooked, isLoading: isLoading1 } =
    useHaveBookedServiceQuery({ userId: userId, serviceId: id });

  const [createBooking] = useCreateBookingMutation();
  const [createReview] = useCreateReviewMutation();

  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [collectDate, setCollectDate] = useState<boolean>(false);
  const [openReviewField, setOpenReviewField] = useState<boolean>(false);

  const bookingFunc = async (data: any) => {
    try {
      const res = await createBooking({
        body: {
          userId: userId,
          serviceId: +id,
          startDate: moment(data?.startDate).toISOString(),
          endDate: moment(data?.endDate).toISOString(),
          bookStatus: "pending",
        },
      }).unwrap();
      if (res) {
        message.success("booking Success", 1);
        setCollectDate(false);
      }
    } catch (err: any) {
      console.log("error", err.message);
      message.error("login");
    }
  };

  const createTheReview = async (data: any) => {
    try {
      const res = await createReview({
        body: {
          userId: userId,
          serviceId: +id,
          review: data?.review,
          rating: +data.rating,
        },
      }).unwrap();
      if (res) {
        message.success("Review Add Success", 1);
        setOpenReviewField(false);
      }
    } catch (err: any) {
      console.log("error", err.message);
      message.error("login");
    }
  };

  console.log("df isAlreadyBooked ", isAlreadyBooked);
  return (
    <div>
      {isLoading || isLoading1 || isLoading2 ? (
        <Spinner />
      ) : (
        <div style={{ backgroundColor: "GrayText" }}>
          <NavbarComponent />

          <div style={{ width: "50%", margin: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                onClick={() => history.back()}
                style={{ width: "100px" }}
                type="primary"
                danger
              >
                <BackwardOutlined />
                Back
              </Button>
              <Popover
                open={openConfirmation}
                content={
                  <div>
                    <Button
                      onClick={() => setOpenConfirmation(false)}
                      type="primary"
                      danger
                    >
                      Cancel
                    </Button>

                    <Button
                      style={{
                        backgroundColor: "#15d42f",
                        width: "100px",
                        marginLeft: "10px",
                      }}
                      type="primary"
                      onClick={() => {
                        setCollectDate(true);
                        setOpenConfirmation(false);
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                }
              >
                <Button
                  disabled={isAlreadyBooked?.id ? true : false}
                  onClick={() => setOpenConfirmation(true)}
                  style={{
                    backgroundColor: isAlreadyBooked?.id ? "" : "#15d42f",
                  }}
                  type="primary"
                >
                  BooKing
                </Button>
              </Popover>
              <Popover
                open={collectDate}
                content={
                  <div>
                    <Form submitHandler={bookingFunc}>
                      <FormDatePicker name="startDate" />
                      <FormDatePicker name="endDate" />
                      <br />
                      <Button
                        onClick={() => setCollectDate(false)}
                        type="primary"
                        danger
                      >
                        Cancel
                      </Button>

                      <Button
                        style={{
                          backgroundColor: "#15d42f",
                          width: "100px",
                          marginLeft: "10px",
                        }}
                        type="primary"
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </Form>
                  </div>
                }
              ></Popover>
            </div>
          </div>
          <Card
            style={{ padding: "100px", width: "50%", margin: "auto" }}
            cover={
              <>
                <h1 style={{ textAlign: "center", color: "red" }}>
                  {isAlreadyBooked?.id ? "This Service Already Booked" : ""}
                </h1>
                {isAlreadyBooked?.id ? (
                  <h3>
                    Status:{" "}
                    <span style={{ color: "#09b820", marginLeft: "10px" }}>
                      {isAlreadyBooked.bookStatus}
                    </span>
                  </h3>
                ) : null}
                <Image
                  width={150}
                  height={300}
                  alt={data?.title}
                  src={data?.image}
                />
              </>
            }
          >
            <Card.Meta title={data?.title} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>Category: </strong>
                {data?.category}
              </div>
              <div>
                <strong>Price: </strong>${data?.price}
              </div>
              <div>
                <strong>Rating: </strong>
                {data?.rating}
              </div>
              <div>
                <strong>Location: </strong>
                {data?.serviceLocation}
              </div>
              <div>
                {
                  isAlreadyBooked?.id ? 
                  <Button
                  onClick={() => setOpenReviewField(!openReviewField)}
                  type="primary"
                  >
                  Add Review
                </Button> : null
                }
              </div>
            </div>
            <b>Description: </b> <Card.Meta description={data?.description} />
            {openReviewField ? (
              <div
                style={{
                  marginTop: "10px",
                  boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)`,
                  padding: "10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Form submitHandler={createTheReview}>
                  <FormTextArea placeholder="Review" rows={5} name="review" />
                  <br />
                  <FormInput placeholder="Rating" type="number" name="rating" />
                  <br />
                  <div style={{ textAlign: "end" }}>
                    <Button
                      style={{ marginTop: "10px" }}
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            ) : null}
            <div>
              <br />
              <br />
              <b>Reviews:</b>
      {
        reviews && reviews[0] ? reviews?.map((review: any)=>{
          const fullName = `${review?.user?.firstName} ${review?.user?.middleName ? review?.user?.middleName : ""} ${review?.user?.lastName}`
            
          return (
            <Card key={review?.id}>
                <Meta
                  avatar={
                    <Avatar icon={<UserOutlined />} src={review?.user?.profileImage} />
                  } 
                  title={<>
                    <b>{fullName}</b>
                    <br />
                    <b style={{fontSize:"11px"}}>Rating: </b> <span style={{fontSize:"11px"}}>{review.rating} <StarOutlined style={{color:"#d99f00"}}  /> </span>
                  </>}
                  description={review?.review}
                />
              </Card>
          )
        }) : null
      }
              
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Booked), { ssr: false });
