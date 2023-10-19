'use client'
import Form from '@/component/Forms/Form';
import FormTextArea from '@/component/Forms/FormTextArea';
import { authKey } from '@/constants/storageKey';
import { useCreateFeedbackMutation } from '@/redux/api/feedBackApi';
import { getUserInfo, removeLocalStorageInfo } from '@/services/auth.service';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function FeedbackPage() {
  const { role,userId } = getUserInfo() as any;
  const history = useRouter();
  setTimeout(() => {
    if (role !== "user" || role !== "admin" || role !== "super_admin") {
      removeLocalStorageInfo(authKey);
      history.push("/login");
    }
  }, 1000);

  const [createFeedback] = useCreateFeedbackMutation()
  const handleSubmit = async (data: any) => {
    message.loading("Creating.....", 1);
    try {
      if(data?.comment || data?.suggestion){
        await createFeedback({ body:{
          userId: userId, 
        comment: data?.comment,
        suggestion: data?.suggestion, 
        } });
      }
      message.success("Create Feedback successfully", 1);
    } catch (err: any) {
      message.error(err.message);
    }
  };
  return (
    <div style={{display:"flex",justifyContent:"center",padding:'10px',width:"60%",margin:"auto"}}>
      <Form style={{width:"100%"}} submitHandler={handleSubmit}>
      <h1 style={{textAlign:"center"}}>Add Feedback</h1>
      <FormTextArea style={{marginTop:'20px',marginBottom:"20px"}} rows={5} name='comment' placeholder='Comment' />
      <FormTextArea rows={5} name='suggestion' placeholder='Suggestion' />
      <br />
      <div style={{textAlign:"end"}}>
        <Button type="primary" htmlType='submit'>Submit</Button>
      </div>
      </Form> 
    </div>
  )
}
