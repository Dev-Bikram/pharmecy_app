import { Skeleton, Stack, Typography } from "@mui/material";
import { lazy } from "react";
import { HomeTableWrapper } from "styles/StyledComponents/HomeTableWrapper";

const Table = lazy(() => import("@mui/material/Table"));
const TableContainer = lazy(() => import("@mui/material/TableContainer"));
const TableHead = lazy(() => import("@mui/material/TableHead"));
const TableRow = lazy(() => import("@mui/material/TableRow"));
const TableBody = lazy(() => import("@mui/material/TableBody"));
const TableCell = lazy(() => import("@mui/material/TableCell"));

export default function MedicineTableSkeleton() {
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
            {[1, 2, 2, 2, 2, 22]?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Skeleton height={20} variant="rectangular" />
                </TableCell>

                <TableCell>
                  <Typography variant="h5">
                    <Skeleton height={20} variant="rectangular" />
                  </Typography>
                </TableCell>
                <TableCell>
                  <Skeleton height={20} variant="rectangular" />
                </TableCell>
                <TableCell>
                  <Skeleton height={20} variant="rectangular" />
                </TableCell>
                <TableCell>
                  <Skeleton height={20} variant="rectangular" />
                </TableCell>
                <TableCell>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    className="action_stack"
                    spacing={1}
                  >
                    <Skeleton height={20} variant="rectangular" />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </HomeTableWrapper>
  );
}
