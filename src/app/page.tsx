'use client'
import Image from 'next/image'
import styles from './page.module.css'
import NavbarComponent from '@/component/Common/Navbar'
import HeaderComponent from '@/component/Home/Header'
import AvailableServices from '@/component/Home/AvailableServices'
import UpComingServices from '@/component/Home/UpcommingServices'
import EventsByCategory from '@/component/Home/EventsByCategory' 
import Review from '@/component/Home/Review'
import LatestNews from '@/component/Home/LatestNews'
import FooterComponent from '@/component/Home/Footer'
import Trusted from '@/component/Home/Trusted'
import ChooseUs from '@/component/Home/ChooseUs'
  
  
export default function Home() {
  return (
     <> 
      <NavbarComponent />
      <HeaderComponent />
      <AvailableServices />
      <UpComingServices />
      <EventsByCategory />
      <Review />
      <LatestNews />
      <Trusted />
      <ChooseUs />
      <FooterComponent />
     </>
  )
} 