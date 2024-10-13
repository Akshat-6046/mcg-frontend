import useRequest from "@/hooks/useRequest";
import { setCookie } from "@/utils/cookieUtils";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

interface OAuthResponse {
  token: string;
}

const GoogleLoginButton = () => {
  const { data, refetch: fetch, loading } = useRequest();

  const handleSuccess = async (response: CredentialResponse) => {
    const token = response.credential;
    await fetch("/hiGoogleAuthEndpoint", { token }, false);

    if (data) {
      const { token } = data as OAuthResponse;
      setCookie("token", token);
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
    >
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
