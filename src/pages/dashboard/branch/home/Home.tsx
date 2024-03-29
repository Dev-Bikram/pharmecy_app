import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import Wrapper from "Layout/Wrapper/Wrapper";
import { Result } from "antd";
import { fetchpharmacybranchlists } from "api/functions/pharmacy-branch-api";
import CommonHeader from "components/CommonHeader/CommonHeader";
import HomeTableSkeleton from "components/HomeTable/HomeTableSkeleton";
import NotFoundResult from "components/NotFound/NotFoundResult";
import HomePaginationSection from "components/Pagination/HomePagination";
import { useAppSelector } from "hooks/redux/useAppSelector";
import assest from "json/assest";
import React, { lazy, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { UserRoleEnum } from "typescript/interface/auth.interface";
import InputFieldCommon from "ui/CommonInput/CommonInput";
import CustomButtonPrimary from "ui/CustomButtons/CustomButtonPrimary";
const HomeTable = lazy(() => import("../../../../components/HomeTable/HomeTable"));

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
      padding: 0 5px;
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

const modalstyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: 24,
  p: 4,
};
const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { userData } = useAppSelector((s) => s.userSlice)
  const [filterdata, setFilterdata] = useState({
    data: {
      "page": 1,
      "length": 50,
      "sortBy": "id",
      "sortOrder": "DESC"
    }
  })

  // const pageNumber = Number(filterdata.data.page) || 1;
  // const lengthNumber = Number(filterdata.data.length) || 10;

  const { data: branchlists, isLoading: branchlistloading, isError: branchlisterror } = useQuery({
    queryFn: () => fetchpharmacybranchlists({
      page: currentPage,
      length: itemsPerPage,
      search: "",
      sortBy: "id",
      sortOrder: "DESC"
    }),
    queryKey: ["branchlists", currentPage]
  })

  // Search Implementation
  const filteredOrderLists = useMemo(() => {
    if (!searchQuery) return branchlists?.data.data.docs;
    return branchlists?.data.data.docs?.filter((order: any) =>
      order?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.postcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [branchlists?.data.data.docs, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Wrapper defaultHeader>
        <Box className="body_layout">
          <BranchWrapper>
            <CommonHeader headerIcon={assest?.branchIcon} title="Branches">
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexWrap={"wrap"}
              >
                <Box className="search_field">
                  <InputFieldCommon
                    placeholder="Search branch.."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    adorMentIcon={<SearchRoundedIcon />}
                  />
                </Box>
                {
                  userData?.role === UserRoleEnum.admin ? (
                    <>
                      <Box className="stack_each_btn">
                        <CustomButtonPrimary
                          variant={"contained"}
                          color={"success"}
                          endIcon={<AddIcon />}
                          onClick={handleOpen}
                        >
                          <Typography variant="body1">Branch Upload</Typography>
                        </CustomButtonPrimary>
                      </Box>
                      <Box className="stack_each_btn">
                        <CustomButtonPrimary
                          onClick={() => { }}
                          variant={"contained"}
                          color={"primary"}
                          endIcon={<AddIcon />}
                        >
                          <Typography variant="body1">Add Single Branch</Typography>
                        </CustomButtonPrimary>
                      </Box>
                    </>
                  ) : null
                }
              </Stack>
            </CommonHeader>

            {/* Home Table View */}
            {
              branchlistloading ? (
                <><HomeTableSkeleton /></>
              ) : !!branchlists?.data.data.docs?.length ? (
                <><HomeTable data={filteredOrderLists} /></>
              ) : (
                <>
                  <Result
                    status="info"
                    icon={<NotFoundResult text="No branch found" />}
                    extra={[
                      <CustomButtonPrimary
                        size="large"
                        onClick={() => navigate("/dashboard/branch/add")}
                      >
                        Add Single Branch
                      </CustomButtonPrimary>
                    ]}
                  />
                </>
              )
            }
            <HomePaginationSection
              totalItems={branchlists?.data.data.totalRecords || 0}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </BranchWrapper>
        </Box>
      </Wrapper>

      {/* CSV Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalstyle}>
          <Stack direction={"column"} spacing={3}>
            <Typography id="modal-modal-title" variant="h2" component="h2">
              Upload CSV file Here
            </Typography>
            <TextField type="file" />
            <Stack direction={"row"} spacing={3}>
              <Button variant="contained" color="primary">Submit</Button>
              <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Home;
