import { ApiConstants } from "@/constants/apiContants";
import { useState } from "react";

interface OptionsType {}
const useRequest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<unknown>(null);
  const [loadingState, setLoadingState] = useState<ApiConstants>(
    ApiConstants.API_INITIAL
  );

  const fetchData = async (
    url: string,
    options: OptionsType,
    onSuccessCallback?: (...args: []) => unknown,
    onFailureCallback?: (...args: []) => unknown
  ) => {
    setLoadingState(ApiConstants.API_FETCHING);
    setData(null);
    setError(null);
    try {
      const response = await fetch(url, { ...options });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();

      setData(result);
      setLoadingState(ApiConstants.API_SUCCESS);
      onSuccessCallback?.();
    } catch (ex: unknown) {
      setLoadingState(ApiConstants.API_ERROR);
      setError(ex);
      console.log("Error: ", ex);
      onFailureCallback?.();
    }
  };

  return { refetch: fetchData, data, loadingState, error };
};

export default useRequest;
