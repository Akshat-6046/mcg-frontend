import React, { useRef } from "react";

import {
  Container,
  BackButton,
  OtpFieldContainer,
  TextContainer,
  OtpInputField,
  Error,
} from "./styles";
import ArrowBack from "@mui/icons-material/ArrowBack";

interface Props {
  otp: Array<string>;
  setOtp: (val: Array<string>) => void;
  setIsLoginScreen: (val: boolean) => void;
  setOtpError: (val: boolean) => void;
  otpError: boolean;
}

const VerifyOTP = ({
  otp,
  setOtp,
  otpError,
  setOtpError,
  setIsLoginScreen,
}: Props): React.ReactElement => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/[^0-9]/g, "");
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
    if (otpError) {
      setOtpError(false);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Container>
      <BackButton>
        <ArrowBack onClick={() => setIsLoginScreen(true)} />
      </BackButton>
      <TextContainer>Enter OTP</TextContainer>
      <OtpFieldContainer>
        {otp.map((_, index: number) => (
          <OtpInputField
            key={index}
            className={otpError ? "error" : ""}
            type="text"
            maxLength={1}
            value={otp[index]}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onChange={(e) => handleChange(e.target, index)}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </OtpFieldContainer>
      {otpError && <Error>Invalid OTP</Error>}
    </Container>
  );
};

export default VerifyOTP;
