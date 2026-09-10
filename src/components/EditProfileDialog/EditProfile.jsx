import { Dialog, DialogTitle } from "@mui/material";

export const EditProfile = ({ open, close, patient }) => {
  console.log(patient);

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Edit Patient Profile</DialogTitle>
    </Dialog>
  );
};
