"use client";
import React, { useEffect, useState } from "react";

import MainLayout from "@/app/common/MainLayout";
import bannerimg from "@/app/assets/villabgimg.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAllVillas } from "@/app/store/slice/villaSlice";
import VillaCard from "@/app/common/VillaCard";
import MapPicker from "@/app/common/MapPicker";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ITEMS_PER_PAGE = 8;

const headings = [
  "Explore Our Luxury Villas",
  "Premium Villas for Perfect Getaways",
];

const VillasSection = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(0);

  const { villas = [] } = useSelector((state) => state.villas);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(getAllVillas());
  }, [dispatch]);

  const paginatedVillas = villas.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  const totalPages = Math.ceil(villas.length / ITEMS_PER_PAGE);

  const mapPosition = villas
    .map((villa) => {
      if (villa?.map?.latitude && villa?.map?.longitude) {
        return {
          id: villa._id,
          lat: villa.map.latitude,
          lng: villa.map.longitude,
          image: villa.images?.villaImage,
          price: villa.offerPrice || villa.price,
          title: villa.villaName,
          slug: `/villa/${villa.slug}`,
        };
      }
      if (villa?.locationId?.mapLink) {
        return {
          id: villa._id,
          mapLink: villa.locationId.mapLink,
          image: villa.images?.villaImage,
          price: villa.offerPrice || villa.price,
          title: villa.villaName,
          slug: `/villa/${villa.slug}`,
        };
      }

      return null;
    })
    .filter(Boolean);

  return (
    <MainLayout>
      <div
        className="relative w-full h-[321px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${bannerimg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="relative h-[65px] md:h-[81px] mb-6">
            <AnimatePresence mode="wait">
              <motion.h1
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 text-4xl md:text-5xl font-bold text-white"
              >
                {headings[index]}
              </motion.h1>
            </AnimatePresence>
          </div>
          <p className="text-white text-base md:text-lg">
            Curated luxury villas for comfort, elegance, and unforgettable
            getaways.
          </p>
        </div>
      </div>
      <div className="px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-10 justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-4 lg:col-span-7"
          >
            {villas?.length > 8 && (
              <div className="flex items-center justify-end gap-3 mb-4">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 0))}
                  disabled={page === 0}
                  className="p-2 rounded-full border disabled:opacity-40"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={() =>
                    setPage((p) => (p + 1 < totalPages ? p + 1 : p))
                  }
                  disabled={page + 1 >= totalPages}
                  className="p-2 rounded-full border disabled:opacity-40"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            )}
            <div
              className="
                                flex gap-4 overflow-x-auto
                                md:grid md:grid-cols-2
                                2xl:grid-cols-4
                                md:overflow-visible
                                scrollbar-hide
                            "
            >
              {paginatedVillas?.map((villa) => (
                <div key={villa._id} className="w-[280px] shrink-0 md:w-full">
                  <VillaCard
                    title={villa.villaName}
                    images={villa.images?.villaGallery}
                    price={villa.offerPrice || villa.price}
                    maxGuests={villa.maxGuests}
                    slug={villa.slug}
                    amenities={villa.amenities}
                  />
                </div>
              ))}
            </div>
          </motion.div>
          <div className="md:col-span-5 lg:col-span-4">
            <div className="sticky top-24 h-[calc(100vh-120px)]">
              <div className="h-full w-full rounded-xl overflow-hidden">
                <MapPicker
                  initialPosition={mapPosition}
                  isInput={false}
                  multiple={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VillasSection;
