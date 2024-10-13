import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const navigateToHome = (router: AppRouterInstance): void => {
  router.push("/");
};

export const navigateToLogin = (router: AppRouterInstance): void => {
  router.push("/login");
};
