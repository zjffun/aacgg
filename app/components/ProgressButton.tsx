"use client";

import { setProgressTo } from "@/services/item";
import { Stack, Typography } from "@mui/material";
import { showToast } from "./Toast";

import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { IProgress, ISubItem } from "../types";

function SelectSubItemDrawer({ open, subItem, onClose, onSelect }) {
  return (
    <Drawer open={open} onClose={onClose} anchor="bottom">
      <Typography variant="subtitle1">Watch to:</Typography>
      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
        }}
        spacing={0}
      >
        {subItem.map((item) => (
          <Button
            key={item.id}
            onClick={() => {
              onSelect(item.id);
            }}
          >
            {item.name}
          </Button>
        ))}
      </Stack>
    </Drawer>
  );
}

function ProgressButton({
  itemId,
  progress,
  subItem,
  updateProgress,
}: {
  itemId?: string;
  progress?: IProgress[];
  subItem: ISubItem[];
  updateProgress: () => void;
}) {
  const [open, setOpen] = useState(false);

  const finished = progress?.length === subItem.length;

  const changeProgress = async (id) => {
    await setProgressTo({
      itemId,
      subItemId: id,
    });

    showToast("Success");
    updateProgress();
    setOpen(false);
  };

  const lastProgress = progress && progress[progress.length - 1];
  const name = subItem.find((d) => d.id === lastProgress?.id)?.name;

  return (
    <>
      <Button
        aria-label="add to favorites"
        disabled={!itemId || progress === undefined}
        color={finished ? "success" : "info"}
        onClick={() => setOpen(true)}
      >
        {name ? `Watched to ${name}` : "Not watched"}
      </Button>
      <SelectSubItemDrawer
        open={open}
        subItem={subItem}
        onSelect={changeProgress}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default ProgressButton;
