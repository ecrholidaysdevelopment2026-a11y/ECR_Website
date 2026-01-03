"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVillas } from "@/app/store/slice/villaSlice";
import { LocationSection } from "@/app/common/LocationSection";

const DestinationsByLocation = () => {
    const dispatch = useDispatch();
    const { getAllVillas = [] } = useSelector((state) => state.villas);

    useEffect(() => {
        dispatch(fetchVillas());
    }, [dispatch]);

    return (
        <>
            {getAllVillas?.map((location) => (
                <LocationSection key={location._id} location={location} />
            ))}
        </>
    );
};

export default DestinationsByLocation;
