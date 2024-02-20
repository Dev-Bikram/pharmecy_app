import useUrlState from "@ahooksjs/use-url-state";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
    Box,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import Header from "Layout/Header/Header";
import { useMemoizedFn } from "ahooks";
import { Empty } from "antd";
import { fetchMedicineList } from "api/functions/medicine.api";
import { getAssignedAll } from "api/functions/pharmacy-branch-api";
import AddEditMedicineModal from "components/CommonModals/AddEditMedicineModal";


import NotFoundResult from "components/NotFound/NotFoundResult";
import MedicineTable from "components/Tables/MedicineTable/MedicineTable";
import MedicineTableSkeleton from "components/Tables/MedicineTable/MedicineTableSkeleton";


import { useDebounce } from "hooks/general/useDebounce";
import { lazy, useRef, useState } from "react";
import { useQuery } from "react-query";
import { IgetAssignedEach } from "typescript/interface/pharmacy-branch.interface";

import InputFieldCommon from "ui/CommonInput/CommonInput";
import StyledAutoComplete from "ui/CommonInput/CustomAutocomplete";
import CustomButtonPrimary from "ui/CustomButtons/CustomButtonPrimary";
import MedicineIcon from "ui/Icons/MedicineIcon";

const BranchWrapper = lazy(
    () => import("styles/StyledComponents/BranchWrapper")
);
const Wrapper = lazy(() => import("Layout/Wrapper/Wrapper"));
const CommonHeader = lazy(() => import("components/CommonHeader/CommonHeader"));
const PaginationSection = lazy(
    () => import("components/Pagination/Pagination")
);

const Medicine = () => {
    const [value, setvalue] = useState<string>("");
    const [length, setlength] = useState<number>(5);
    const [open, setOpen] = useState(false);
    const [number, setnumber] = useState("");

    const [selectedBranch, setSelectedBranch] = useState<IgetAssignedEach | null>(
        null
    );
    const [selectedBranchId, setSelectData] = useState<number | null>(null);

    const handleSelect = (event: SelectChangeEvent<unknown>) => {
        setSelectData(Number(event.target.value));
    };

    const [filterParams, setFilterParams] = useUrlState(
        {
            search: "",
            length: 50,
            page: 1
        },
        {
            navigateMode: "replace",
            stringifyOptions: {
                skipEmptyString: true,
                strict: true,
                arrayFormat: "comma"
            }
        }
    );

    const pageNumber = Number(filterParams?.page) || 1;
    const lengthNumber = Number(filterParams?.length) || 5;

    const updateFilterParams = useMemoizedFn((newValues: typeof filterParams) => {
        setFilterParams((prevParams) => {
            return {
                ...prevParams,
                ...newValues
            };
        });
    });



    const [page, setPage] = useState<number>(1);

    const query = useDebounce(value, 500);

    const { data, isLoading } = useQuery(
        ["pharmacy-medicine-list", length, page, query, selectedBranchId, pageNumber, lengthNumber],
        {
            queryFn: ({ signal }) => {
                return fetchMedicineList(
                    {
                        page: pageNumber,
                        length: lengthNumber,
                        query,
                        pharmacyBranchId: Number(selectedBranchId)
                    },
                    signal
                );
            },
            enabled: Boolean(selectedBranchId)
        }
    );

    const _branchList = useQuery("getAssignedAll", {
        queryFn: () => getAssignedAll()
    });

    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <Wrapper headerComponent={<Header defaultHeader />}>
            <AddEditMedicineModal
                onClose={() => setOpen(!open)}
                type="add"
                onCancel={() => setOpen(!open)}
                open={open}
            />
            <Box className="body_layout">
                <BranchWrapper>
                    <CommonHeader headerIcon={<MedicineIcon />} title="Medicines">
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            flexWrap={"wrap"}
                        >
                            {selectedBranchId ? (
                                <Box className="search_field">
                                    <InputFieldCommon
                                        value={value}
                                        onChange={(e) => {
                                            setvalue(e.target.value);
                                            setPage(1);
                                        }}
                                        placeholder="Search medicines.."
                                        adorMentIcon={<SearchRoundedIcon />}
                                    />
                                </Box>
                            ) : null}
                            <Box className="search_field">
                                <Box className="filter_wrapper">
                                    <Box className="filter_left">
                                        <StyledAutoComplete
                                            sx={{ width: 300 }}
                                            options={_branchList?.data?.data.data || []}
                                            getOptionLabel={(option) => option?.name}
                                            //@ts-ignore
                                            value={selectedBranch}
                                            onChange={(
                                                event: any,
                                                newValue: IgetAssignedEach | null
                                            ) => {
                                                setSelectedBranch(newValue);
                                                setSelectData(Number(newValue?.id));
                                                setPage(1);
                                            }}
                                            renderOption={(props, option) => (
                                                <Box
                                                    component="li"
                                                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                                    {...props}
                                                >
                                                    {option?.name}
                                                </Box>
                                            )}
                                            openOnFocus
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Choose a branch"
                                                    sx={{
                                                        border: "none"
                                                    }}
                                                    inputRef={inputRef}
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: "branch-name"
                                                    }}
                                                />
                                            )}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="stack_each_btn">

                            </Box>
                        </Stack>
                    </CommonHeader>

                    {isLoading ? (
                        <MedicineTableSkeleton />
                    ) : selectedBranchId && !!data?.data.data && data?.data?.data.docs?.length ? (
                        <>
                            <MedicineTable
                                data={data?.data?.data.docs}
                                limit={length}
                                page={page}
                                branchId={selectedBranchId}
                            />
                            <PaginationSection
                                // limit={length}
                                // count={data?.data?.data.totalPages}
                                // onChangeLimit={(e) => {
                                //   setlength(e.target.value);
                                //   setPage(1);


                                // }}



                                // setPage={(e, value) => setPage(value)}
                                // page={page}

                                limit={length}
                                count={data?.data?.data.totalPages}
                                onChangeLimit={(e) => {
                                    updateFilterParams({ length: e.target.value, page: 1 });
                                    setlength(e.target.value);
                                    // setPage(1);
                                }}
                                setPage={(e, value) => { updateFilterParams({ page: value });
                                setPage(value)}}
                                page={page}
                            />
                        </>
                    ) : !selectedBranchId ? null : (
                        <NotFoundResult text="No medicines found" />
                    )}

                    {!selectedBranchId ? (
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{ height: 60 }}
                            description={
                                <Typography variant="h4">Please select branch first</Typography>
                            }
                        >
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <CustomButtonPrimary
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => {
                                        inputRef.current?.click();
                                    }}
                                >
                                    Select branch
                                </CustomButtonPrimary>
                            </Stack>
                        </Empty>
                    ) : null}
                </BranchWrapper>
            </Box>
        </Wrapper>
    );
};

export default Medicine;
