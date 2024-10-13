"use client";
import { useEffect } from "react";
import { getCookie } from "@/utils/cookieUtils";
import Loader from "@/Components/Loader";

import { useRouter, usePathname } from "next/navigation";

const withAuth = (WrappedComponent: React.ComponentType<any>): React.FC => {
  const AuthComponent = (props: any): React.ReactElement => {
    const isAuthenticated = !!getCookie("token");
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (isAuthenticated && pathname === "/login") {
        router.push("/");
      }
      if (!isAuthenticated && pathname !== "/login") {
        router.push("/login");
      }
    }, []);

    if (!isAuthenticated) {
      router.replace("/login");
    }

    if (!isAuthenticated && pathname !== "/login") {
      return <Loader color="var(--blue-500)" height="80" width="80" />;
    }

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};
export default withAuth;
