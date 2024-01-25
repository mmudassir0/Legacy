import React from "react";
import { studentsGroups } from "../util/constants/StudentsGroups";

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  DialogContent,
  TextField,
  Grid,
  DialogActions,
  Button,
  Box,
  FormGroup,
} from "@mui/material";
import { User } from "./Interface";
import usePost from "../hooks/usePost";
import usePatch from "../hooks/usePatch";

type FormsProps = {
  formData: User;
  setFormData: React.Dispatch<React.SetStateAction<User>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTableData: React.Dispatch<React.SetStateAction<User[]>>;
  tableData: User[];
  isUpdating: boolean;
};

const Forms = ({
  formData,
  setFormData,
  setOpen,
  isUpdating,
  tableData,
  setTableData,
}: FormsProps): JSX.Element => {
  const inputdata: User = {
    name: "",
    place: "",
    gender: "",
    age: "",
    groups: [],
    image: null as File | null,
  };

  //   const [formData, setFormData] = React.useState<User>(inputdata);

  const { data, loading, makeRequestforPost } = usePost(
    "http://localhost:4000/student"
  );

  const { patchData, makeRequestForPatch } = usePatch(
    "http://localhost:4000/student"
  );

  const [errors, setErrors] = React.useState({
    name: false,
    place: false,
    gender: false,
    age: false,
    groups: false,
  });

  const validateForm = (): boolean => {
    const newErrors = {
      name: formData.name.trim() === "",
      place: formData.place.trim() === "",
      gender: formData.gender.trim() === "",
      age: formData.age.trim() === "",
      groups: formData.groups.length === 0,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const file = files[0];

      setFormData({ ...formData, image: file });
    }
    // console.log(files);
    // setSelectedImage(event.target.files[0]);
  };
  console.log(formData, "formData formData");

  const handleCheckboxChange = (option: string): void => {
    const { groups } = formData;
    const isSelected = groups.includes(option);

    if (isSelected) {
      setFormData({
        ...formData,
        groups: groups.filter((selectedOption) => selectedOption !== option),
      });
    } else {
      setFormData({
        ...formData,
        groups: [...groups, option],
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      await makeRequestforPost(formData);

      setOpen(false);
    }

    setTableData([...tableData, formData]);
    setFormData(inputdata);
  };

  const handelUpdate = async () => {
    makeRequestForPatch(formData);

    setOpen(false);
    setFormData(inputdata);
    console.log(patchData, "patchData patchData");
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(inputdata);
  };

  return (
    <div>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                autoFocus
                variant="standard"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                helperText={errors.name ? "Name is required" : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Place"
                name="place"
                variant="standard"
                value={formData.place}
                onChange={handleChange}
                error={errors.place}
                helperText={errors.place ? "Place is required" : ""}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl error={errors.gender} component="fieldset" fullWidth>
              <FormLabel component="legend">Choose your gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                aria-label="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio size="small" />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio size="small" />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio size="small" />}
                  label="Other"
                />
              </RadioGroup>
              <div style={{ color: "#d32f2f" }}></div>
              {errors.gender ? "choose your gender" : ""}
            </FormControl>
          </Grid>
          <Grid>
            <TextField
              type="date"
              label="Date of Birth"
              //   labelPlacement="bottom"
              name="age"
              variant="standard"
              fullWidth
              value={formData.age}
              onChange={handleChange}
              error={errors.age}
              helperText={errors.age ? "date of birth is required" : ""}
            />
          </Grid>
          <Grid>
            <FormGroup
            // error={errors.groups}
            >
              <FormLabel>Groups</FormLabel>
              <Grid container>
                {studentsGroups.map((item) => (
                  <Grid item xs={6} key={item}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.groups.includes(item)}
                          onChange={() => handleCheckboxChange(item)}
                        />
                      }
                      label={item}
                    />
                  </Grid>
                ))}
              </Grid>
              <div style={{ color: "#d32f2f" }}></div>
            </FormGroup>
          </Grid>
          <Grid>
            {/* <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}

              // onChange={handleImageUpload}
            >
              Upload file
              <VisuallyHiddenInput type="file" accept="image/*" />
            </Button> */}

            <input
              type="file"
              accept="image/*"
              name="image"
              id=""
              onChange={handleFileChange}
            />
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="error" variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={isUpdating ? handelUpdate : handleSubmit}
        >
          {isUpdating ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </div>
  );
};

export default Forms;
