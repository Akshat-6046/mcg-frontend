"use client";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { StyledTextField } from "./styles";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

interface Props {
  email: string;
  password: string;
  confirmPassword: string;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  setConfirmPassword: (val: string) => void;
  emailError: boolean;
  passwordError: boolean;
  confirmPasswordError: boolean;
}

const SignupForm = ({
  email,
  password,
  confirmPassword,
  confirmPasswordError,
  emailError,
  passwordError,
  setEmail,
  setPassword,
  setConfirmPassword,
}: Props): React.ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show);
  };

  const getConfirmpasswordErrorText = (): React.ReactNode => {
    if (!confirmPasswordError) {
      return null;
    }
    if (confirmPassword.length === 0) {
      return "Confirm Password is required";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
  };

  return (
    <>
      <StyledTextField
        variant="outlined"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        error={emailError}
        helperText={emailError ? "Invalid email" : null}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          },
        }}
      />

      <StyledTextField
        id="outlined-password-input"
        placeholder="Password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
        error={passwordError}
        helperText={passwordError ? "Invalid password" : null}
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <StyledTextField
        id="outlined-password-input"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setConfirmPassword(e.target.value);
        }}
        error={confirmPasswordError}
        helperText={getConfirmpasswordErrorText()}
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          },
        }}
      />
    </>
  );
};
export default SignupForm;
