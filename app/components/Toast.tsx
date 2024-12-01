"use client";

import { Snackbar, SnackbarCloseReason } from "@mui/material";
import * as React from "react";

let setOpenSnackbar;
let setMessageSnackbar;

function ToastComp() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  setOpenSnackbar = setOpen;
  setMessageSnackbar = setMessage;

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
    />
  );
}

function showToast(message) {
  setMessageSnackbar?.(message);
  setOpenSnackbar?.(true);
}

export { ToastComp, showToast };
