"use client";
import UMBreadCrumb from "@/component/Common/UMBreadCrumb";
import Form from "@/component/Forms/Form";
import FormInput from "@/component/Forms/FormInput";
import { authKey } from "@/constants/storageKey";
import {
  useCreateFaqsMutation,
  useDeleteFaqsMutation,
  useGetAllFaqsQuery,
} from "@/redux/api/blogPost";
import { getUserInfo, removeLocalStorageInfo } from "@/services/auth.service";
import { IFaqs } from "@/types";
import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Row, Spin, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function FaqsPage() {
  const { role } = getUserInfo() as any;
  const history = useRouter();
  if (role !== "admin") {
    removeLocalStorageInfo(authKey);
    history.push("/login");
  }
  const [openForm, setFormOpen] = useState<boolean>(false);
  const [createFaqs] = useCreateFaqsMutation();
  const [deleteFaqs] = useDeleteFaqsMutation();
  const { data, isLoading } = useGetAllFaqsQuery({});
  console.log("data ", data);
  return (
    <div>
      {isLoading ? (
        <Spin style={{ marginTop: "200px" }} tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <div>
          <UMBreadCrumb
            items={[
              {
                label: `${role}`,
                link: `/${role}/profile`,
              },
              {
                label: `faqs`,
                link: `/${role}/faqs`,
              },
            ]}
          />
          <Button onClick={() => setFormOpen(true)}>Create FAQS</Button>
          <br />
          <br />
          {openForm ? (
            <Form
              submitHandler={async (data: any) => {
                console.log("first  ", data);
                message.loading("Created.....", 1);
                try {
                  //   console.log(data);
                  await createFaqs({ body: data });
                  message.success("Create successfully", 1);
                  setFormOpen(false);
                } catch (err: any) {
                  //   console.error(err.message);
                  message.error(err.message);
                }
              }}
            >
              <Row style={{ marginLeft: "30px" }}>
                <Col sm={6}>
                  <FormInput
                    label="Question"
                    placeholder="Question"
                    name="question"
                  />
                </Col>
                <Col style={{ marginLeft: "20px" }} sm={6}>
                  <FormInput label="Ans" placeholder="Ans" name="ans" />
                </Col>
                <Col style={{ marginLeft: "20px" }} sm={6}>
                  <Button type="primary" htmlType="submit">
                    SUBMIT
                  </Button>
                </Col>
              </Row>
            </Form>
          ) : null}
         <div style={{margin: '50px'}}>
         {data?.faqs?.map((e: IFaqs) => {
            return (
              <div key={e?.id}>
                <div
                  style={{  width: "70%", textAlign: "left",marginTop:"20px" }}
                >
                 <div style={{display:'flex',justifyContent:'space-between',alignItems:"center"}}>
                    <div>
                    <h2>QNA: {e.question}</h2>
                  <h4 style={{ marginTop: "10px" }}> ANS: {e.ans}</h4>
                    </div>
                    {
                        role !== 'user' ? <Button onClick={ async()=>{
                            message.loading("Deleting.....", 1);
                            try {
                              //   console.log(data);
                              await deleteFaqs({ id: e?.id });
                              message.success("Deleted successfully", 1); 
                            } catch (err: any) {
                              //   console.error(err.message);
                              message.error(err.message);
                            }
                        }} style={{textAlign:"end"}} danger><DeleteFilled /></Button> : null
                    }
                  
                 </div>
                  <hr /> 
                </div>
              </div>
            );
          })}
         </div>
        </div>
      )}
    </div>
  );
}
