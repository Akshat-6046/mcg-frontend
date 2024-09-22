import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #fff;
    }

    &:hover fieldset {
      border-color: #fff;
    }

    &:hover {
      background: #373a58;
    }

    &.Mui-focused fieldset {
      border-color: var(--blue-600);
    }
    & .MuiIconButton-root {
      color: #e0e0e0;
    }
  }

  & .MuiInputBase-input {
    color: #fff;
  }

  & .MuiFormLabel-root {
    color: #fff;
  }

  & .MuiInputAdornment-root {
    color: #fff;
  }
  margin: 24px 0 0 0;
`;
