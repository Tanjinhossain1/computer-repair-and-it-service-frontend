"use client";
import NavbarComponent from "@/component/Common/Navbar";
import HeaderComponent from "@/component/Home/Header";
import AvailableServices from "@/component/Home/AvailableServices";
import UpComingServices from "@/component/Home/UpcommingServices";
import EventsByCategory from "@/component/Home/EventsByCategory";
import Review from "@/component/Home/Review";
import LatestNews from "@/component/Home/LatestNews";
import FooterComponent from "@/component/Home/Footer";
import Trusted from "@/component/Home/Trusted";
import ChooseUs from "@/component/Home/ChooseUs";
import dynamic from "next/dynamic";

function HomePage() {
  return (
    <div>
      <NavbarComponent />
      <div>
        <HeaderComponent />
      </div>
      <div style={{marginTop:"-150px"}}>
        <AvailableServices />
      </div>
      <UpComingServices />
      <EventsByCategory />
      <Review />
      <LatestNews />
      <Trusted />
      <ChooseUs />
      <FooterComponent />
    </div>
  );
}
export default dynamic (() => Promise.resolve(HomePage), {ssr: false})
