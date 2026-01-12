"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slice/authSlice";
import { isLoginExpired } from "@/app/utils/setupTokenRefresh";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isLoginExpired()) {
      dispatch(logout());
      router.replace("/login");
    } else {
      setChecked(true);
    }
  }, [dispatch, router]);

  if (!checked) return null;

  return children;
};

export default ProtectedRoute;
