import React, { FC } from "react";

import { User } from "./Interface";
import TableData from "./Tabledata";
import FormsButton from "./FormsButton";
import { Container, Divider, Grid } from "@mui/material";
import FilterWithSearch from "./FilterWithSearch";
import FilterGroups from "./FilterGroups";
import Pagination from "./Pagination";
import FormsWIthFormik from "./FormsWIthFormik";
// import useFetch from "../hooks/useFetch";

function UserData(): JSX.Element {
  const [tableData, setTableData] = React.useState<User[]>([]);
  const [open, setOpen] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [orignalTableData, setOrignalTableData] = React.useState<User[]>([]);
  const [formData, setFormData] = React.useState<User>({
    name: "",
    place: "",
    gender: "",
    age: "",
    groups: [],
    image: null as File | null,
  });

  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState("");

  const handleCheckboxChange = (option: string) => {
    const isSelected = selectedGroups.includes(option);

    if (isSelected) {
      setSelectedGroups(selectedGroups.filter((group) => group !== option));
    } else {
      setSelectedGroups([...selectedGroups, option]);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchName = event.target.value;
    setSearch(searchName);
  };

  React.useEffect(() => {
    const filterMultipleData = orignalTableData
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .filter((item) => {
        if (selectedGroups.length === 0) {
          return true;
        } else {
          return selectedGroups.some((group) => item.groups.includes(group));
        }
      });

    setTableData(filterMultipleData);
  }, [search, selectedGroups]);

  return (
    <div>
      <Grid container paddingBottom={2}>
        <Grid item xs={3} padding={3}>
          <FilterWithSearch
            onSearch={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(event)
            }
          />
        </Grid>
        <Grid item xs={9} paddingTop={6}>
          <FormsButton
            tableData={tableData}
            open={open}
            setOpen={setOpen}
            formData={formData}
            setFormData={setFormData}
            isUpdating={isUpdating}
            setTableData={setTableData}
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid container>
        <Grid item xs={3} padding={3}>
          <FilterGroups
            onCheckboxChange={handleCheckboxChange}
            selectedGroups={selectedGroups}
          />
        </Grid>
        <Grid item xs={9}>
          <Container>
            <TableData
              formData={formData}
              tableData={tableData}
              setTableData={setTableData}
              setOpen={setOpen}
              setFormData={setFormData}
              setIsUpdating={setIsUpdating}
              setOrignalTableData={setOrignalTableData}
            />
          </Container>
        </Grid>
      </Grid>
      {/* <Pagination /> */}
      <FormsWIthFormik />
    </div>
  );
}

export default UserData;
