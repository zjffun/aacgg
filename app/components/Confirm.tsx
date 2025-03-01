"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

let setConfrimInfo;
let confirmResolve;
let confirmReject;

interface IInfo {
  open?: boolean;
  title?: string;
  content?: string;
  confirmText?: string;
}

function ConfirmComp() {
  const [info, setInfo] = useState<IInfo>({});

  setConfrimInfo = setInfo;

  const handleConfirmClick = () => {
    confirmResolve();
    setInfo({});
  };

  return (
    <Dialog maxWidth="xs" open={Boolean(info.open)}>
      <DialogTitle>{info.title || "Confirm"}</DialogTitle>
      <DialogContent dividers>{info.content}</DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            confirmReject();
            setInfo({});
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleConfirmClick}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

async function showConfirm(param: {
  title?: string;
  content?: string;
  confirmText?: string;
}) {
  const { promise, resolve, reject } = Promise.withResolvers();

  confirmResolve = resolve;
  confirmReject = reject;

  setConfrimInfo?.({
    open: true,
    ...param,
  });

  return promise;
}

export { ConfirmComp, showConfirm };
