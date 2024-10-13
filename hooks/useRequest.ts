import { useEffect, useState } from "react";
import axios from "axios";
import { ApiConstants } from "@/constants/apiContants";
import { clearCookie, getCookie } from "@/utils/cookieUtils";

interface BodyType {}
const useRequest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<unknown>(null);
  const [loadingState, setLoadingState] = useState<ApiConstants>(
    ApiConstants.API_INITIAL
  );

  const fetchData = async (
    url: string,
    body: BodyType,
    isAuthenticated = true,
    method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
    onSuccessCallback?: (...args: Array<unknown>) => unknown,
    onFailureCallback?: (err: Error) => unknown
  ) => {
    setLoadingState(ApiConstants.API_FETCHING);
    setData(null);
    setError(null);
    try {
      const response = await axios(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}${url}`,
        {
          method,
          data: body,
          headers: isAuthenticated
            ? {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("token")}`,
              }
            : undefined,
        }
      );

      if (response.status <= 200 && response.status > 299) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.data;
      setData(result);
      setLoadingState(ApiConstants.API_SUCCESS);
      onSuccessCallback?.(result);
    } catch (ex: unknown) {
      setLoadingState(ApiConstants.API_ERROR);
      const errorMessage = ex?.response?.data?.error;
      setError(errorMessage);
      console.log("Error: ", ex);
      onFailureCallback?.(errorMessage);
    }
  };

  useEffect(() => {
    if (error === "Invalid Token") {
      clearCookie("token");
      window.location.reload();
    }
  }, [error]);

  return { refetch: fetchData, data, loadingState, error };
};

export default useRequest;
