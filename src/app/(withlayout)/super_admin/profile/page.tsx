'use client'
import { useGetProfileDetailQuery } from '@/redux/api/userApi';
import { getUserInfo } from '@/services/auth.service';
import { Button, Card, Col, Divider, Popover, Row, Typography } from 'antd'  
import React, { useState } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image';
import EditProfile from '@/component/Common/EditProfile';
import UMBreadCrumb from '@/component/Common/UMBreadCrumb';

const { Title, Text } = Typography;

export default function ProfilePage() {
    const { role } = getUserInfo() as any;
    const [openPopover,setOpenPopover] = useState<boolean>(false)
    const {userId} = getUserInfo() as any
    const {data} = useGetProfileDetailQuery({id:userId});
   const user = data?.profile
  return (
    <div className="profile-page">
          <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}/profile`,
          },
          {
            label: `profile`,
            link: `/${role}/profile`,
          },
        ]}
      />
    <Card title={<>
       <div style={{display:'flex',justifyContent:"space-between"}}>
       <h2>Super Admin Profile</h2>
        <div style={{textAlign:"center"}}>
        <Popover
              content={
                <EditProfile
                 data={user}
                 setOpenPopover={setOpenPopover}
                />
              } 
              open={openPopover} 
            >
            <Button onClick={()=>setOpenPopover(true)} type='primary'>EDIT PROFILE DETAIL</Button>
            </Popover>
        </div>
       </div>
    </>} style={{ width: '100%' }}>
        <div style={{textAlign:"center",borderRadius:"50"}}>
            <Image style={{borderRadius:"10%"}} src={user?.profileImage ? user?.profileImage : ''} width={200} height={200} alt=''></Image>
        </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Title level={4}>Personal Information</Title>
          <Divider />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong>First Name:  </Text>
          <Text>{user?.firstName} </Text>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong>Last Name:  </Text>
          <Text>{user?.lastName} </Text>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong>Middle Name:  </Text>
          <Text>{user?.middleName || '-'} </Text>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong>Date of Birth:  </Text>
          <Text>{dayjs(user?.dateOfBirth).format("MMM D, YYYY hh:mm A")}  </Text>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong>Gender: </Text>
          <Text>{user?.gender || '-'} </Text>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong>Blood Group: </Text>
          <Text>{user?.bloodGroup || '-'} </Text>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong>Email: </Text>
          <Text>{user?.email} </Text>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong>Contact No: </Text>
          <Text>{user?.contactNo} </Text>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong>Emergency Contact No: </Text>
          <Text>{user?.emergencyContactNo || '-'} </Text>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong>Present Address: </Text>
          <Text>{user?.presentAddress || '-'} </Text>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong>Permanent Address: </Text>
          <Text>{user?.permanentAddress || '-'} </Text>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong>Role: </Text>
          <Text>{user?.role} </Text>
        </Col> 
      </Row>
    </Card>
  </div>
  )
}
