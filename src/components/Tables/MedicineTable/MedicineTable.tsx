import { Stack, Typography } from "@mui/material";
import { queryClient } from "App";
import { chageMedicneStatus } from "api/functions/medicine.api";
import { lazy, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { HomeTableWrapper } from "styles/StyledComponents/HomeTableWrapper";
import { ImedicineListObj } from "typescript/interface/medicine.interface";
import CustomSwitch from "ui/CustomSwitch/CustomSwitch";

const Table = lazy(() => import("@mui/material/Table"));
const TableContainer = lazy(() => import("@mui/material/TableContainer"));
const TableHead = lazy(() => import("@mui/material/TableHead"));
const TableRow = lazy(() => import("@mui/material/TableRow"));
const TableBody = lazy(() => import("@mui/material/TableBody"));
const TableCell = lazy(() => import("@mui/material/TableCell"));

interface MedicineTableProps {
  data: ImedicineListObj[];
  page: number;
  limit: number;
  branchId: number | null;
}

const calculatePrice: any = (price1: number, price2: number) => {
  const difference = price1 - price2;

  if (difference > 0) {
    return `£ ${difference.toFixed(2)}`;
  }

  return "---";
};

const MedicineTableRow = ({
  row,
  branchId
}: {
  row: ImedicineListObj;
  branchId: number | null;
}) => {
  const [enable, setEnable] = useState(row?.status === "active" || false);

  const { mutate } = useMutation(chageMedicneStatus);

  const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (branchId) {
      setEnable(event.target.checked);
      mutate(
        {
          APPID: `${row?.APPID}`,
          amppId: row?.id.toString(),
          status: event.target.checked ? "active" : "inactive",
          pharmacyBranchId: branchId
        },
        {
          onSuccess: (res) => {
            toast.success("Status updated successfully! 🎉");
            queryClient.invalidateQueries("pharmacy-medicine-list");
          }
        }
      );
    }
  };

  return (
    <TableRow
      key={row.APPID}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      className="medicine_table_row"
    >
      <TableCell width={700}>{row?.productName}</TableCell>
      <TableCell>
        <Typography variant="h5">{row?.QTYVAL}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h5">£{row?.price}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="h5">
          {calculatePrice(row?.resalePrice, row?.price)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h5">£{row?.resalePrice}</Typography>
      </TableCell>
      <TableCell>
        <Stack direction={"row"} alignItems={"center"} className="action_stack">
          {/* <CustomButtonPrimary
            variant="outlined"
            color="info"
            buttonType="small"
            endIcon={<EditIcon />}
            onClick={toggle}
          >
            <Typography variant="body1">Edit</Typography>
          </CustomButtonPrimary>
          <CustomButtonPrimary
            variant="contained"
            color="secondary"
            buttonType="small"
            endIcon={<DeleteIcon IconColor={primaryColors.white} />}
          >
            <Typography variant="body1">Remove</Typography>
          </CustomButtonPrimary> */}

          <CustomSwitch
            // label={enable ? "Active" : "Inactive"}
            checked={enable}
            onChange={handleStatus}
            // readOnly={!editMode}
          />
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default function MedicineTable({
  data,
  page,
  limit,
  branchId
}: MedicineTableProps) {
  return (
    <HomeTableWrapper>
      <TableContainer>
        <Table
          sx={{
            minWidth: "100%"
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Medication Name</TableCell>
              <TableCell>Pack Qty</TableCell>
              <TableCell>DT Price Per Pack</TableCell>
              <TableCell>Markup</TableCell>
              <TableCell>Resale Price</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((row, index) => (
              <MedicineTableRow row={row} branchId={branchId} key={row.APPID} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </HomeTableWrapper>
  );
}
