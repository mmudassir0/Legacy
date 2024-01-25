import React from "react";

import {
  TableBody,
  TableHead,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  Table,
  Checkbox,
  Link,
  Typography,
  Stack,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "./Interface";

import useDelete from "../hooks/useDelete";
import axios from "axios";
import Pagination from "./Pagination";

type TableProps = {
  formData: User;
  tableData: User[];
  setTableData: React.Dispatch<React.SetStateAction<User[]>>;
  setOrignalTableData: React.Dispatch<React.SetStateAction<User[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<User>>;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
};
const TableData = ({
  formData,
  tableData,
  setTableData,
  setOpen,
  setFormData,
  setIsUpdating,
  setOrignalTableData,
}: TableProps): JSX.Element => {
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openForDelete, setOpenForDelete] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pagenatedData, setpagenatedData] = React.useState<User[]>([]);
  let PageSize = 3;

  //   const [tableData, setTableData] = React.useState<User[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  // const { data, isLoading, error } = useFetch("http://localhost:4000/student");

  // console.log(isLoading, "isLoading in table");

  const { deletedData, loading, deleteRequest } = useDelete(
    "http://localhost:4000/student"
  );
  // console.log(data, tableData, "data,tableData");
  //   const fetchData = () => {
  //     if (data) setTableData(data);
  //   };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:4000/student");
      console.log(response.data, "response response response");
      setTableData(response.data);
      setOrignalTableData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const fetchPaginatedData = async () => {
    // let pageNumber = document.getElementById("page-input")?.value;
    // if (!pageNumber) {
    //   alert("Please enter a valid number");
    //   return;
    // }
    let url = `http://localhost:4000/student/page/?currentPage=${currentPage}&limit=${PageSize}`;
    const res = await axios.get(url);
    // setTableData(res.data);
    return res.data.pageContent;
    // console.log(res.data.pageContent);
  };
  // fetchPaginatedData();

  React.useEffect(() => {
    fetchData();
  }, []);
  React.useEffect(() => {
    const fetchPageData = async () => {
      let url = `http://localhost:4000/student/page/?currentPage=${currentPage}&limit=${PageSize}`;
      const res = await axios.get(url);
      setpagenatedData(res.data.pageContent);
    };

    fetchPageData();
  }, [currentPage]);

  const handleClickOpenForDelete = () => {
    if (selectedRows.length > 0) {
      setOpenForDelete(true);
    }
  };

  const handleCloseForDelete = () => {
    setOpenForDelete(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = tableData.map((row, index) => index);
      setSelectedRows(newSelected);
      return;
    }
    setSelectedRows([]);
  };

  const handleRowCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const isSelected = event.target.checked;
    // console.log(isSelected, "isselected");
    setSelectedRows(() =>
      isSelected
        ? [...selectedRows, rowIndex]
        : selectedRows.filter((id) => id !== rowIndex)
    );
  };
  // console.log(selectedRows, "selectedRows selectedRows ");
  const rowCount = tableData.length;
  // console.log(rowCount, "rowCount");

  const handleEdit = (rowData: number) => {
    const selectedData = tableData.filter((item, index) =>
      selectedRows.includes(index)
    );

    if (selectedRows.length === 1) {
      setOpen(true);
      setIsUpdating(true);
      setFormData(selectedData[0]);

      // updateTableData([tableData,])
    }
  };
  const handleDelete = async () => {
    const selectedData = tableData.filter((item, index) =>
      selectedRows.includes(index)
    );
    console.log(selectedData);
    let ids: number[] = [];
    selectedData.map((item) => {
      const id: number = item.id;
      return ids.push(id);
    });
    console.log(ids);
    await deleteRequest(ids);
    console.log(deletedData, "deletedData deletedData");

    const data = tableData.filter((data) => !selectedData.includes(data));
    setTableData(data);
    setOpenForDelete(false);
    setSelectedRows([]);
    // fetchData();
  };

  const columns = [
    { field: "id", headerName: "", width: "50px" },
    { field: "name", headerName: "Name", width: "300px" },
    { field: "place", headerName: "Place ", width: "300px" },
    { field: "gender", headerName: "Gender", width: "100px" },
    { field: "age", headerName: "age", width: "200px" },
    { field: "groups", headerName: "Groups", width: "600px" },
  ];

  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return tableData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tableData]);
  console.log(currentTableData, "currentTableData currentTableData");
  // const handlePageNumber = (event) => {
  //   const page = event.target.value;
  //   setPageNumber(page);
  // };

  return (
    <>
      <TableContainer sx={{ maxHeight: "600px" }}>
        <Grid container p={2}>
          <Grid item xs={6}>
            <Typography variant="h5" component="h2">
              Student Information
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack alignItems="flex-end">
              <Stack direction="row" spacing={2}>
                {selectedRows.length >= 1 ? (
                  <Button
                    variant="contained"
                    color={"error"}
                    startIcon={<DeleteIcon />}
                    onClick={handleClickOpenForDelete}
                  >
                    <Typography
                    //   variant="contained"
                    >
                      Delete
                    </Typography>
                  </Button>
                ) : (
                  ""
                )}

                <Dialog
                  open={openForDelete}
                  onClose={handleCloseForDelete}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete"}
                  </DialogTitle>

                  <DialogActions>
                    <Button onClick={handleCloseForDelete}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus>
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
                {selectedRows.length === 1 ? (
                  <Button
                    variant="contained"
                    color={"success"}
                    startIcon={<BorderColorIcon />}
                    onClick={() => handleEdit(selectedRows[0])}
                    // disabled={!selectedRow}
                  >
                    <Typography variant="button">Edit</Typography>
                  </Button>
                ) : (
                  ""
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Table component={Paper} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  defaultValue=""
                  onChange={handleSelectAllClick}
                  checked={rowCount > 0 && selectedRows.length === rowCount}
                />
              </TableCell>
              {columns.map((row) => {
                return (
                  <TableCell key={row.field} sx={{ width: row.width }}>
                    {row.headerName}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <Box sx={{ display: "flex" }}>
                <h1>Loading...</h1>
                <CircularProgress />
              </Box>
            ) : (
              currentTableData.map((item, index) => {
                console.log("item", item);
                console.log(`localhost/4000/${item.image}`);
                const displayedElements = expanded
                  ? item.groups
                  : item.groups.slice(0, 2);
                // console.log(displayedElements, "displayedElements");
                return (
                  <TableRow key={item.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        defaultValue=""
                        checked={selectedRows.includes(index)}
                        onChange={(event) =>
                          handleRowCheckboxChange(event, index)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {/* <Avatar>{item.name[0].toUpperCase()}</Avatar> */}
                      {item.image ? (
                        <Avatar
                          alt="Remy Sharp"
                          src={`http://localhost:4000/images/${item.image}`}
                        />
                      ) : (
                        <Avatar>{item.name[0].toUpperCase()}</Avatar>
                      )}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.place}</TableCell>
                    <TableCell>{item.gender}</TableCell>
                    <TableCell>{item.age}</TableCell>
                    <TableCell>
                      {/* {console.log(displayedElements,"displayedElements")} */}
                      {displayedElements.join(", ")}
                      {` `}
                      {item.groups.length > 2 && (
                        <Link
                          component="button"
                          variant="body2"
                          onClick={handleExpandClick}
                        >
                          {expanded
                            ? `less`
                            : `  ${item.groups.length - 2} more`}
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={tableData.length}
        pageSize={PageSize}
        onPageChange={(page: any) => setCurrentPage(page)}
      />
    </>
  );
};

export default TableData;
