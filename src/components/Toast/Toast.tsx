import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Fragment, useEffect, useState } from "react";

export const Toast: React.FC<{
  type: "success" | "info" | "warning" | "error";
  message?: string;
}> = ({ type, message }) => {
  const [open, setOpen] = useState(!!message);

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <Fragment>
      <IconButton color="inherit" size="large" onClick={handleClose}>
        <Close fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      action={action}
      onClose={handleClose}
    >
      <Alert
        severity={type}
        action={action}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
