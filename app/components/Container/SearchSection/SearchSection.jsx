"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearVillaError, searchVillas } from "@/app/store/slice/villaSlice";
import MainLayout from "@/app/common/MainLayout";
import Toast from "@/app/common/Toast";

const SearchSection = () => {
    const dispatch = useDispatch();
    const { searchResults, loading, searchError } = useSelector(state => state.villas);
    const [data, setData] = useState(null);
    const [toastMessage, setToastMessage] = useState("");



    useEffect(() => {
        const stored = localStorage.getItem("searchParams");
        if (stored) {
            const parsed = JSON.parse(stored);
            setData(parsed);
            const queryString = "?" + new URLSearchParams(parsed).toString();
            dispatch(searchVillas(queryString));
        }
    }, [dispatch]);

    useEffect(() => {
        if (searchError) {
            setToastMessage(searchError);
            dispatch(clearVillaError());
        }
    }, [searchError, dispatch]);

    return (
        <MainLayout className="px-3 md:px-30">
            {toastMessage && <Toast type="error" message={toastMessage} />}
        </MainLayout>
    );
};

export default SearchSection;
