<<<<<<< HEAD
import BannerSection from './components/Container/HomeSection/BannerSection';
import Header from './components/Common/Header/Header';
=======
import React from 'react'
import BannerSection from './components/Container/HomeSection/BannerSection'
import Header from './components/Common/Header/Header'
>>>>>>> 3117bdd47e565d954c51a6a685d0a22fad1fb592
import bannerimg from "@/app/assets/banner-bg-img.png";
import MainLayout from './common/MainLayout';
import Destination from './components/Container/HomeSection/Destination/Destination';
import EveryStayStory from './components/Container/HomeSection/EveryStayStory';
import HomeOfferSection from './components/Container/HomeSection/HomeOfferSection';
import UnforgettableEvents from './components/Container/HomeSection/UnforgettableEvents';
import RentPropertySection from './components/Container/HomeSection/RentPropertySection';
import StatsSection from './components/Container/HomeSection/StatsSection';
import InspirationSection from './components/Container/HomeSection/InspirationSection';

export const metadata = {
<<<<<<< HEAD
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
=======
>>>>>>> 3117bdd47e565d954c51a6a685d0a22fad1fb592
  title: "Luxury Villas & Holiday Homes | Premium Stays",
  description:
    "Book luxury villas, holiday homes, and unforgettable stays with premium comfort, best locations, and exclusive offers.",
  keywords: [
    "luxury villas",
    "holiday homes",
    "villa rentals",
    "premium stays",
    "vacation rentals",
  ],
  openGraph: {
    title: "Luxury Villas & Premium Holiday Homes",
    description:
      "Discover luxury villas and premium holiday homes for unforgettable stays.",
    images: ["/banner-bg-img.png"],
    type: "website",
  },
};

<<<<<<< HEAD
export default function Page() {
=======
function page() {
>>>>>>> 3117bdd47e565d954c51a6a685d0a22fad1fb592
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
<<<<<<< HEAD
          <div className="z-10 mt-20">
            <BannerSection />
          </div>
        </div>
      </MainLayout>

=======
          <div className=" z-10 mt-20">
            <BannerSection />
          </div>

        </div>
      </MainLayout>
>>>>>>> 3117bdd47e565d954c51a6a685d0a22fad1fb592
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
<<<<<<< HEAD
  );
}
=======
  )
}

export default page
>>>>>>> 3117bdd47e565d954c51a6a685d0a22fad1fb592
