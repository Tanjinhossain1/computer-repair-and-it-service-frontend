'use client'
import React from 'react' 
import { useRouter } from 'next/navigation';
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from '@/redux/api/authApi';
import { Button, Col, Input, Row, message } from 'antd';
import { storeUserInfo } from '@/services/auth.service'; 
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import FormInput from '../Forms/FormInput';
import Form from '../Forms/Form';
import loginValidationSchema from '@/schemas/login';
import { yupResolver } from '@hookform/resolvers/yup'; 

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
        submitHandler={onSubmit} 
        style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }}
        resolver={yupResolver(loginValidationSchema)}
      >
        <h1 style={{ textAlign: 'center',marginBottom: "5px" }}>Login</h1>
        <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormInput
            name="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First Name"
          />
        </Col>
        <Col span={24}>
          <FormInput
          type='password'
            name="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="First Name"
          />
        </Col>
        </Row> 

        {/* <Form.Item
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
        </Form.Item> */}
        <p style={{ textAlign: 'center',margin: 0,padding:0,marginTop: '5px',marginBottom: '5px' }}>
          Don{`'`}t have an account? <Link href="/register" style={{ color: '#1890ff',margin: 0,padding:0 }}>Register</Link>
        </p> 
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button> 
      </Form>
    </div>
  )
}
