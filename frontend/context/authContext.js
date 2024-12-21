"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { validateToken } from "@/util/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    retreiveUser();
  }, []);

  const retreiveUser = async () => {
    const token = Cookies.get("authorized");
    console.log(token)
    if (token) {
      const user = await validateToken();
      setUser(user);
      console.log(user)
      if (router.path == "/login" || router.path == "/signup") {
        setLoading(false);
        router.push("/app");
      } else {
        setLoading(false);
      }
    } else {
      console.log(token)
      if (router.pathname !== "/login" && router.pathname !== "/signup") {
        setLoading(false);
        router.push("/login");
      } else {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
