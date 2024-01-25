import React from "react";
import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { studentsGroups } from "../util/constants/StudentsGroups";
import { User } from "./Interface";

type FilterGroupsProps = {
  onCheckboxChange: (option: string) => void;
  selectedGroups: string[];
};

const FilterGroups = ({
  onCheckboxChange,
  selectedGroups,
}: FilterGroupsProps) => {
  return (
    <Container>
      <FormGroup>
        <FormLabel>Filter for Study Groups</FormLabel>
        {studentsGroups.map((group) => {
          return (
            <FormControlLabel
              key={group}
              control={
                <Checkbox
                  checked={selectedGroups.includes(group)}
                  onChange={() => onCheckboxChange(group)}
                />
              }
              label={group}
            />
          );
        })}
      </FormGroup>
    </Container>
  );
};

export default FilterGroups;
