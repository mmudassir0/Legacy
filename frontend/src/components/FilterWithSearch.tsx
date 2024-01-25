import React from "react";
import {
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type FilterSearchProps = {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const FilterWithSearch = ({ onSearch }: FilterSearchProps) => {
  return (
    <Container>
      <Typography variant="subtitle2" marginBottom={1}>
        SEARCH FOR NAME
      </Typography>

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="filled"
        placeholder="Search"
        size="small"
        hiddenLabel
        onChange={onSearch}
      />
    </Container>
  );
};

export default FilterWithSearch;
