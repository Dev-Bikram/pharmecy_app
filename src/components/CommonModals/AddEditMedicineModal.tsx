import styled from "@emotion/styled";
import {
  Box,
  DialogProps,
  Grid,
  InputAdornment,
  Stack,
  Typography
} from "@mui/material";
import { primaryColors } from "Theme/_muiPalette";
import assest from "json/assest";
import { AddEditType } from "typescript/types/common.type";
import InputFieldCommon from "ui/CommonInput/CommonInput";
import CustomButtonPrimary from "ui/CustomButtons/CustomButtonPrimary";
import PoundIcon from "ui/Icons/PoundIcon";

import Modalsection from "ui/Modal/Modalsection";

interface UploadModalProps extends DialogProps {
  onClose: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  type: AddEditType;
}
export const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
export default function AddEditMedicineModal({
  open,
  onClose,
  onCancel,
  isLoading
}: UploadModalProps) {
  const handleCancel = () => {
    onClose();
  };

  return (
    <Modalsection open={open} className={"adminModal"} onClose={onClose}>
      <Box className="adminModalWrapper">
        <Stack
          direction="column"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          pb={2}
        >
          <figure>
            <img src={assest?.editmedicine} alt="" />
          </figure>
          <Typography variant="h2" color={primaryColors.black}>
            Edit Medicine
          </Typography>
          <Typography variant="subtitle1" color={primaryColors.mainFontColor}>
            Edit the selected medicine information
          </Typography>
        </Stack>

        <Box className="form_group">
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Typography variant="body1" className="label_txt">
                Medicine Name
              </Typography>
              <InputFieldCommon
                placeholder="Medicine Name"
                type="text"
                name="medicineName"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">Pack Qty</Typography>
              <InputFieldCommon
                placeholder="Pack Qty"
                type="text"
                name="medicineName"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">DT Price Per Pack</Typography>
              <InputFieldCommon
                placeholder="DT Price Per Pack"
                type="text"
                name="medicineName"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PoundIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">Markup</Typography>
              <InputFieldCommon
                placeholder="Markup"
                type="text"
                name="medicineName"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PoundIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">Resale Price</Typography>
              <InputFieldCommon
                placeholder="Resale Price"
                type="text"
                name="medicineName"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PoundIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box className="adminModalButtonWrapper">
          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            className="modalbtnWrapper"
          >
            <Box className="each_btn">
              <CustomButtonPrimary
                type="button"
                onClick={handleCancel}
                variant="outlined"
                color="info"
              >
                <Typography variant="body1">Cancel</Typography>
              </CustomButtonPrimary>
            </Box>

            <Box className="each_btn">
              <CustomButtonPrimary
                variant="contained"
                type="submit"
                color="primary"
                loading={isLoading}
              >
                <Typography variant="body1">Save Information</Typography>
              </CustomButtonPrimary>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Modalsection>
  );
}
