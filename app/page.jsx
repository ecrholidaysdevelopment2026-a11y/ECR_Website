import React from 'react'
import BannerSection from './components/Container/HomeSection/BannerSection'
import Header from './components/Common/Header/Header'
import bannerimg from "@/app/assets/banner-bg-img.png";
import MainLayout from './common/MainLayout';
import Destination from './components/Container/HomeSection/Destination/Destination';
import EveryStayStory from './components/Container/HomeSection/EveryStayStory';
import HomeOfferSection from './components/Container/HomeSection/HomeOfferSection';
import UnforgettableEvents from './components/Container/HomeSection/UnforgettableEvents';
import RentPropertySection from './components/Container/HomeSection/RentPropertySection';
import StatsSection from './components/Container/HomeSection/StatsSection';
import InspirationSection from './components/Container/HomeSection/InspirationSection';

function page() {
  return (
    <>
      <MainLayout>
        <div
          className="relative w-full h-[420px] 2xl:h-screen flex items-center justify-center"
          style={{
            backgroundImage: `url(${bannerimg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute top-0 left-0 w-full z-20">
            <Header />
          </div>
          <div className=" z-10 mt-20">
            <BannerSection />
          </div>

        </div>
      </MainLayout>
      <MainLayout>
        <Destination />
        <EveryStayStory />
        <HomeOfferSection />
        <UnforgettableEvents />
        <RentPropertySection />
        <StatsSection />
        <InspirationSection />
      </MainLayout>
    </>
  )
}

export default page
