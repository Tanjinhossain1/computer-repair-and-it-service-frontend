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
import OverViewSection from "@/component/Home/Overview";
import BlogPostSection from "@/component/Home/BlogPostSection";

function HomePage() {
  return (
    <div>
      <NavbarComponent />
      <div style={{ backgroundColor: "#e8e8e8" }}>
        <div>
          <HeaderComponent />
        </div>
        <div>
          <div style={{ backgroundColor: "#A555EC" }}>
            <div style={{ marginTop: "-150px" }}>
              <AvailableServices />
            </div>
          <UpComingServices />
          <EventsByCategory />
          <OverViewSection />
          <Review />
          <LatestNews />
          <Trusted />
          <BlogPostSection />
          <ChooseUs />
          <FooterComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
export default dynamic(() => Promise.resolve(HomePage), { ssr: false });
