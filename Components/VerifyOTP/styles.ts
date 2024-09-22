import styled from "@emotion/styled";

export const Container = styled.div``;

export const BackButton = styled.div`
  cursor: pointer;
`;

export const OtpFieldContainer = styled.div`
  margin-top: 16px;
`;

export const TextContainer = styled.div`
  color: var(--white);
  font-size: 20px;
  font-weight: 500;
  display: flex;
  justify-content: center;
`;

export const OtpInputField = styled.input`
  width: 48px;
  height: 48px;
  text-align: center;
  font-size: 20px;
  margin: 4px 6px;
  background-color: #1e2734;
  border: 1px solid #1d6ad2;
  border-radius: 4px;

  &.error {
    border-color: var(--red-500);
  }
`;

export const Error = styled.div`
  color: var(--red-500);
  font-size: 12px;
  padding-left: 6px;
`;
