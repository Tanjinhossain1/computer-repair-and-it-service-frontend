import React from 'react' 
import { useRouter } from 'next/navigation';
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from '@/redux/api/authApi';
import { Button, Form, Input, message } from 'antd';
import { storeUserInfo } from '@/services/auth.service';
import CustomForm from '../Forms/Form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

type FormValues = {
    email: string;
    password: string;
  };
export default function LoginForm() {
    const [userLogin] = useUserLoginMutation();
    const router = useRouter()
  
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
        const res = await userLogin({...data}).unwrap();
        if(res?.accessToken){
          router.push('/profile')
          message.success("User Login Success",1)
        }
  
        storeUserInfo({accessToken: res?.accessToken })
      } catch (err) {console.error(err)}
    };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CustomForm
      submitHandler={onSubmit}
        style={{ width: '300px' }}
      >
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
      </CustomForm>
    </div>
  )
}
