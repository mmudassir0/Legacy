import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";

interface MyFormValues {
  name: string;
  place: string;
  age: string;
  gender: string;
  groups: string[];
}

const initialValues: MyFormValues = {
  name: "",
  place: "",
  age: "",
  gender: "",
  groups: [],
};

type MyFieldProps<T> = {
  field: {
    name: string;
    value: T;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
  };
  meta: {
    touched: boolean;
    error?: string;
  };
};

const FormsWIthFormik: React.FC<{}> = () => {
  const [data, setData] = React.useState<MyFormValues>({
    name: "",
    place: "",
    age: "",
    gender: "",
    groups: [],
  });
  console.log(data, "data");
  return (
    <div>
      <h1>Name: {data.name}</h1>
      <h1>Place: {data.place}</h1>
      <h1>Age: {data.age}</h1>
      <h1>Gender: {data.gender}</h1>
      <h1>Groups: {data.groups}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .matches(/^([A-Za-z\s]+$)/, "Only alphabet letters are allowed")
            .required("Required"),

          place: Yup.string()
            .max(20, "Must be 20 characters or less")
            .matches(/^([A-Za-z\s]+$)/, "Only alphabet letters are allowed")
            .required("Required"),

          age: Yup.date().typeError("Invalid date format").required("Required"),

          gender: Yup.string()
            // .oneOf(["male", "female", "other"])
            .required("Required"),

          groups: Yup.array().of(Yup.string()).required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setTimeout(() => {
            setData(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Field name="name">
                {({ field, meta }: MyFieldProps<string>) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    variant="outlined"
                    error={meta.touched && meta.error ? true : false}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field name="place">
                {({ field, meta }: MyFieldProps<string>) => (
                  <TextField
                    {...field}
                    label="Place"
                    fullWidth
                    variant="outlined"
                    error={meta.touched && meta.error ? true : false}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={1}>
            <Grid item>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Choose your gender</FormLabel>

                <RadioGroup row>
                  <label>
                    <Field type="radio" name="gender" value="male" />
                    Male
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="female" />
                    Female
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="other" />
                    Other
                  </label>
                </RadioGroup>

                <ErrorMessage name="gender" />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Field name="age">
                {({ field, meta }: MyFieldProps<string>) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Date of Birth"
                    fullWidth
                    variant="outlined"
                    error={meta.touched && meta.error ? true : false}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </Grid>
          </Grid>
          <Grid>
            <label>
              <Field type="checkbox" name="groups" value="One" />
              One
            </label>
            <label>
              <Field type="checkbox" name="groups" value="Two" />
              Two
            </label>
            <label>
              <Field type="checkbox" name="groups" value="Three" />
              Three
            </label>
            <ErrorMessage name="groups" />
          </Grid>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormsWIthFormik;
