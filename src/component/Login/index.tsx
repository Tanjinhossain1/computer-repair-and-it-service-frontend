'use client'
import React from 'react' 
import { useRouter } from 'next/navigation';
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from '@/redux/api/authApi';
import { Button, Form, Input, message } from 'antd';
import { storeUserInfo } from '@/services/auth.service';
import CustomForm from '../Forms/Form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';

type FormValues = {
    email: string;
    password: string;
  };
export default function LoginForm() {
    const [userLogin] = useUserLoginMutation();
    const router = useRouter()
  
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
        console.log('data ', data)
        const res = await userLogin({...data}).unwrap();
        if(res?.accessToken){
          router.push('/')
          message.success("User Login Success",1)
        }
        console.log('res', res)
  
        storeUserInfo({accessToken: res?.accessToken })
      } catch (err: any) {
        console.log('error', err.message)
        message.error("login")
    }
    };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form
        style={{ width: '300px' }}
        onFinish={onSubmit}
      >
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <Form.Item
          name="email"
          required 
          rules={[{ required: true, message: 'Please enter your Email!' }]}
        >
          <Input name="email" type='email' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          required
          rules={[{ required: true, message: 'Please enter your password!' }]}
          style={{margin: 0}}
        >
          <Input.Password
            name="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <p style={{ textAlign: 'center',margin: 0,padding:0,marginTop: '5px',marginBottom: '5px' }}>
          Don{`'`}t have an account? <Link href="/register" style={{ color: '#1890ff',margin: 0,padding:0 }}>Register</Link>
        </p>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
