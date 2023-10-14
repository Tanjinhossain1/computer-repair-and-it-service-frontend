'use client'
import { Spin } from 'antd'
import React from 'react'

const Loading = () => {
  return (
    <Spin style={{marginTop: '200px'}} tip="Loading" size="large">
    <div className="content" />
  </Spin>
  )
}
export default Loading