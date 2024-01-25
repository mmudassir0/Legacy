import React from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Forms from "./Forms";
import { User } from "./Interface";

type FormButtonProps = {
  tableData: User[];
  open: boolean;
  isUpdating: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData: User;
  setFormData: React.Dispatch<React.SetStateAction<User>>;
  setTableData: React.Dispatch<React.SetStateAction<User[]>>;
};

const FormsButton = ({
  tableData,
  open,
  setOpen,
  formData,
  setFormData,
  isUpdating,
  setTableData,
}: FormButtonProps): JSX.Element => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Container>
        <Stack direction="row" justifyContent={"space-between"}>
          <Stack direction="row" spacing={3}>
            <Box>
              <Stack direction="row" spacing={2}>
                {/* <Avatar>
                  <PersonIcon variant="outline" />
                </Avatar> */}
                <Typography variant="h6" paddingTop={0.5}>
                  {tableData.length} - Students
                </Typography>
              </Stack>
            </Box>
            <Box>
              <Button
                variant="contained"
                startIcon={<BorderColorIcon />}
                onClick={handleClickOpen}
              >
                <Typography paddingX={1}>New</Typography>
              </Button>
              <Dialog open={open} onClose={handleClose} maxWidth="sm">
                <DialogTitle variant="h4" sx={{ textAlign: "center" }}>
                  {isUpdating ? "Update Student Data" : "Enter Student Data"}
                </DialogTitle>
                <Forms
                  formData={formData}
                  setFormData={setFormData}
                  setOpen={setOpen}
                  isUpdating={isUpdating}
                  setTableData={setTableData}
                  tableData={tableData}
                />
              </Dialog>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default FormsButton;
