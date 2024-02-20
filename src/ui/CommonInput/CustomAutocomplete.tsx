import { Autocomplete, styled } from "@mui/material";

const StyledAutoComplete = styled(Autocomplete)`
  input {
    border: none !important;
    color: black;
  }
` as typeof Autocomplete;

export default StyledAutoComplete;
