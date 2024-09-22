"use client";

import React, { useState } from "react";

import { Tab, Tabs } from "@mui/material";
import {
  Container,
  Form,
  MainContainer,
  ButtonContainer,
  StyledButton,
  OAuthButtonContainer,
} from "./styles";

import LoginForm from "../../Components/LoginForm";
import SignupForm from "@/Components/SignupForm";
import GoogleOAuthLogin from "@/Components/GoogleOAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useRequest from "@/hooks/useRequest";
import { setCookie } from "@/utils/cookieUtils";
import VerifyOTP from "@/Components/VerifyOTP";
interface UserAuthObject {
  token: string;
}
const UserOnboard = (): React.ReactElement => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [otp, setOtp] = useState<Array<string>>(new Array(6).fill(""));
  const [otpError, setOtpError] = useState(false);

  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const { refetch: fetch, error, loadingState, data } = useRequest();

  const resetErrors = (): void => {
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
  };

  const validateLoginFields = (): boolean => {
    let hasError = false;
    if (email.length === 0) {
      setEmailError(true);
      hasError = true;
    }
    if (password.length === 0) {
      setPasswordError(true);
      hasError = true;
    }

    return !hasError;
  };

  const validateSignupFields = (): boolean => {
    let hasError = false;
    if (email.length === 0) {
      setEmailError(true);
      hasError = true;
    }
    if (password.length === 0) {
      setPasswordError(true);
      hasError = true;
    }
    if (confirmPassword.length === 0) {
      setConfirmPasswordError(true);
      hasError = true;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      hasError = true;
    }
    return !hasError;
  };

  const validateOtp = (): boolean => {
    let hasError = false;
    otp.forEach((item) => {
      if (!new RegExp(/[0-9]{1}/g).test(item)) {
        hasError = true;
        setOtpError(true);
        return;
      }
    });

    return !hasError;
  };

  const handleTabChange = (val: number): void => {
    setSelectedTab(val);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
  };

  const onSuccess = (): void => {
    if (selectedTab === 1 && isLoginScreen) {
      setIsLoginScreen(false);
    } else {
      const { token } = data as unknown as UserAuthObject;
      setCookie("token", token);
    }
  };

  const onFailure = (): void => {
    console.log("Error");
  };

  const handleSubmit = async (): Promise<void> => {
    let reqUrl = "";
    let reqObj = {};

    if (selectedTab === 0) {
      if (validateLoginFields()) {
        reqUrl = "hnjn/login";
        reqObj = {
          email,
          password,
        };
      }
    } else if (selectedTab === 1 && isLoginScreen) {
      if (validateSignupFields()) {
        reqUrl = "jbjhj/signup";
        reqObj = {
          email,
          password,
        };
      }
    } else {
      if (validateOtp()) {
        reqUrl = "/ottototp";
        reqObj = {
          email,
          otp,
        };
      }
    }

    if (reqUrl) {
      resetErrors();
      await fetch(reqUrl, reqObj);
      if (data) {
        onSuccess();
      } else {
        onSuccess();
      }
    }
  };

  const renderTabContent = (): React.ReactElement => {
    if (selectedTab === 0) {
      return (
        <LoginForm
          email={email}
          password={password}
          emailError={emailError}
          passwordError={passwordError}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      );
    }

    return isLoginScreen ? (
      <SignupForm
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        confirmPasswordError={confirmPasswordError}
        emailError={emailError}
        passwordError={passwordError}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
      />
    ) : (
      <VerifyOTP
        otp={otp}
        otpError={otpError}
        setIsLoginScreen={setIsLoginScreen}
        setOtp={setOtp}
        setOtpError={setOtpError}
      />
    );
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
    >
      <Container>
        <MainContainer>
          <Form>
            <Tabs
              value={selectedTab}
              defaultValue={selectedTab}
              aria-label="Tabs"
              onChange={(_, val) => handleTabChange(val)}
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>

            {renderTabContent()}

            <ButtonContainer>
              <StyledButton variant="outlined" onClick={handleSubmit}>
                Submit
              </StyledButton>
            </ButtonContainer>
            <OAuthButtonContainer>
              <GoogleOAuthLogin />
            </OAuthButtonContainer>
          </Form>
        </MainContainer>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default UserOnboard;
