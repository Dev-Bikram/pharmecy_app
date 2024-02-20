import styled from "@emotion/styled";
import { Box } from "@mui/material";
const BranchWrapper = styled(Box)`
  .search_field {
    @media (max-width: 1199px) {
      margin-right: 12px !important;
    }
    @media (max-width: 899px) {
      width: 100%;
      margin-bottom: 12px;
      margin-right: 0 !important;
    }
  }
  .stack_each_btn {
    @media (max-width: 599px) {
      margin: 0 -5px;
    }
    @media (max-width: 599px) {
      margin: 0 !important;
    }
    @media (max-width: 460px) {
      width: 100%;
      margin-bottom: 10px !important;
      button {
        width: 100%;
      }
    }
  }

  .left_stack {
    margin-bottom: 12px;
  }
`;

export default BranchWrapper;
