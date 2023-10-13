'use client'
import React,{useState} from 'react' 
import { Input, Button, Select, DatePicker, Radio, Row, Col, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, FileImageOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import CustomForm from '../Forms/Form';
import { SubmitHandler } from 'react-hook-form';
import { useUserCreateMutation } from '@/redux/api/registerApi';
import { useRouter } from 'next/navigation';
import Form from '../Forms/Form';
import FormInput from '../Forms/FormInput';
import FormDatePicker from '../Forms/DatePicker';
import moment from 'moment'

type FormValues = {
    email: string;
    password: string;
    contactNo: string;
    gender: string;
    dateOfBirth: string;
    firstName: string;
    lastName: string;
    middleName: string;
  };

export default function RegisterForm() {
    const [userCreate] = useUserCreateMutation();
    const router = useRouter();
    const [gender,setGender] = useState<string>("")
    // const [dateOfBirth,setDateOfBirth] = useState<string>("")
  
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
        console.log('submission registration data ', data);
        const finalData = {...data,dateOfBirth: moment(data.dateOfBirth).toISOString() , gender,permanentAddress:"",role: "user"}
        console.log('final registration data ', finalData);
        const res = await userCreate({...finalData}).unwrap();
        
        if(res){
          router.push('/login')
          message.success("User Login Success",1)
        } 

      } catch (err: any) {
        console.log('error', err.message)
        message.error("login")
    }
    };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Form
    submitHandler={onSubmit}
    //   onFinish={onFinish}
      style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }}
    >
      <h1 style={{ textAlign: 'center', color: '#1890ff' }}>Registration</h1>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FormInput
            name="firstName"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First Name"
          />
        </Col>
        <Col span={12}>
          <FormInput
            name="middleName"
            placeholder="Middle Name"
          />
        </Col>
        <Col span={12}>
          <FormInput
            name="lastName"
            placeholder="Last Name"
          />
        </Col>
        <Col span={12}>
            <FormDatePicker name="dateOfBirth" />
          {/* <DatePicker
          onChange={(e)=>setDateOfBirth(`${e?.get('months')}-${e?.get('days')}-${e?.get('years')}`)}
            name="dateOfBirth"
            style={{ width: '100%' }}
          /> */}
        </Col>
        <Col span={16}>
          <Radio.Group
            name="gender"
            onChange={(e)=>setGender(e.target.value)}
          >
            <Radio name='gender' value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="Other">Other</Radio>
          </Radio.Group>
        </Col>
        <Col span={24}>
          <FormInput
            name="email"
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Col>
        <Col span={24}>
            <FormInput
              name="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Col>
        <Col span={24}>
          <FormInput
            name="contactNo"
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Contact Number"
          />
        </Col>
      </Row>
      <p style={{ textAlign: 'center',margin: 0,padding:0,marginTop: '5px',marginBottom: '5px' }}>
          Already have an account? <Link href="/login" style={{ color: '#1890ff',margin: 0,padding:0 }}>Login</Link>
    </p>
      <Button
        type="primary"
        htmlType="submit"
        style={{ width: '100%', backgroundColor: '#1890ff', border: 'none', borderRadius: '5px', marginTop: '2px' }}
      >
        Register
      </Button>
    </Form>
  </div>
  )
}
