"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { IPost } from "../types";
import { useState } from "react";

export default function PostList({
  open,
  data,
  onClose,
}: {
  open?: boolean;
  data?: IPost | null;
  onClose?: (time: string) => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  function handleDeleteClick() {}

  return (
    <>
      <Drawer anchor="bottom" open={open} onClose={onClose}>
        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <ListItemText
                  primary="Edit"
                  onClick={() => {
                    const searchParams = new URLSearchParams({
                      id: data?._id || "",
                    });

                    router.push(`/post/edit?${searchParams}`);
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
                <ListItemText
                  primary="Delete"
                  color="error"
                  onClick={() => {
                    setOpenDialog(true);
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Dialog maxWidth="xs" open={openDialog}>
        <DialogTitle>Confirm Delete Post</DialogTitle>
        <DialogContent dividers>Confirm delete this post?</DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
