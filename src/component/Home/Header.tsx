'use client'
import React from 'react';
import { Layout, Row, Col, Typography, Button, Card } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons'; 
import './header.css'
import Link from 'next/link';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const HeaderComponent = () => {
  return (
    <div style={{backgroundColor: "#200838",paddingBottom:"200px"}} className="banner">
      <div className="text-container">
        <h2 style={{color: 'white'}}>Unable to work? Your computer freezes?</h2>
        <h1 style={{color: 'white'}}>We{`'`}ll help you get back to work.</h1>
        <h1 style={{color: 'white'}}>Fast and Qualitatively.</h1>
       {/* <Link href='/services'> <Button style={{backgroundColor:"#850345"}} type="primary">Services</Button></Link> */}
      </div>
      <div className="image-container">
        <img src="https://demo.brothersthemes.com/comrepair/wp-content/uploads/sites/2/2017/04/macbook-748857_1920-2-1-300x300.png" alt="Computer Services" />
      </div>
    </div>
  );
};

export default HeaderComponent;
