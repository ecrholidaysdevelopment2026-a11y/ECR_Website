<<<<<<< HEAD
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
=======
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
>>>>>>> 3117bdd47e565d954c51a6a685d0a22fad1fb592
