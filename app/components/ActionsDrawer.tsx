"use client";

import { useRouter } from "@/hooks/useNavRouter";
import { deletePost } from "@/services/post";
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
import { useState } from "react";
import { IPost } from "../types";
import { showToast } from "./Toast";

export default function ActionsDrawer({
  open,
  data,
  onClose,
  onDelete,
}: {
  open?: boolean;
  data?: IPost | null;
  onClose?: (time: string) => void;
  onDelete?: () => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  async function handleDeleteClick() {
    try {
      await deletePost(data?._id);
      setOpenDialog(false);
      showToast(`Delete Success`);
      onDelete?.();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Drawer anchor="bottom" open={open} onClose={onClose}>
        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  const searchParams = new URLSearchParams({
                    id: data?._id || "",
                  });

                  router.push(`/post/edit?${searchParams}`);
                }}
              >
                <IconButton>
                  <EditIcon />
                </IconButton>
                <ListItemText primary="Edit" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                <IconButton>
                  <DeleteIcon />
                </IconButton>
                <ListItemText primary="Delete" color="error" />
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
