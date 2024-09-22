import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index: 0;
    background-image: url("../../static/chess_homepage.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 16px;
  background-color: var(--gray-800);
  position: absolute;
  left: 30%;
  top: 100px;
  transform: translate(-50%, 0%);
  color: #fff;
  opacity: 1;
  width: 400px;
  & .MuiTab-textColorPrimary {
    color: #fff;
  }

  & .Mui-selected {
    color: var(--blue-500);
  }
`;

export const StyledButton = styled(Button)`
  margin-top: 30px;
  width: 150px;
  padding: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const OAuthButtonContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  & body {
    background: red;
  }
`;
