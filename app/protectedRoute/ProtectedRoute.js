"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoginExpired } from "../utils/isLoginExpired";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (isLoginExpired()) {
      localStorage.clear();
      router.push("/login");
    }
  }, [router]);

  return children;
};

export default ProtectedRoute;
