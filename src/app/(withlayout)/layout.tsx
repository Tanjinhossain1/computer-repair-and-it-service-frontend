'use client'
import React, { useEffect, useState } from 'react';

import { Layout, Spin } from 'antd';  
import Contents from '@/component/Common/Contents';
import SideBar from '@/component/Common/SideBar';
import { isLoggedIn } from '@/services/auth.service';
import { useRouter } from 'next/navigation'; 

const DashboardLayout = ({
    children
}:{children: React.ReactNode}) => {
  const router = useRouter()
  const isUserLoggedIn = isLoggedIn();
  const [isLoading,setIsLoading] = useState<boolean>(false)
  useEffect(()=>{
    if(!isUserLoggedIn){
      router.push('/login')
    }
    setIsLoading(true)
  },[isUserLoggedIn,router])

  if(!isLoading){
    return <Spin style={{marginTop: '200px'}} tip="Loading" size="large">
    <div className="content" />
  </Spin>
  }
  return ( 
          <Layout hasSider>
            <SideBar />
            <Contents>
          {children}
            </Contents>
              
          </Layout> 
  );
};

export default DashboardLayout;