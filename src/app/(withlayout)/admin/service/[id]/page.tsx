"use client"
import EditServiceComponent from '@/component/Services/EditService'
import { useServiceQuery } from '@/redux/api/service';
import { Spin } from 'antd';
import { useParams } from 'next/navigation'
import React from 'react'

export default function EditService() {
  const {id} = useParams();
  const {data: service,isLoading} = useServiceQuery({id});
  console.log('servi ', service)
  return (
    <div>
      {id}
    {
      isLoading ?  <Spin style={{marginTop: '200px'}} tip="Loading" size="large">
      <div className="content" />
    </Spin>: 
        <EditServiceComponent peram={service} />
    }
    </div>
  )
}
