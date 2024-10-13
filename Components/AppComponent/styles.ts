import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export const StartButton = styled(Button)`
  height: 44px;
  font-weight: 600;
  font-size: 24px;
  padding: 30px 42px;
  margin: 20px 0;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  justify-content: space-evenly;
`;

export const ChessContainer = styled.div`
  height: 500px;
  width: 500px;
`;

export const CancelButton = styled(Button)`
  height: 44px;
  font-weight: 600;
  font-size: 24px;
  padding: 30px 42px;
  margin: 20px 0;
  background-color: var(--red-500);
  color: var(--white);
`;
