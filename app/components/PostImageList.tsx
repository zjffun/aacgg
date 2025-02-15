"use client";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import imageLoader from "../common/imageLoader";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ImageItem } from "../types";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { useState } from "react";

const size = 164;
const cols = 3;

export default function PostImageList({
  images,
  showingDelete = false,
  onChange,
}: {
  images: ImageItem[];
  showingDelete?: boolean;
  onChange?: (images: ImageItem[]) => void;
}) {
  const [deleteTarget, setDeleteTarget] = useState<ImageItem | null>(null);

  const handleDelete = (img: ImageItem) => {
    onChange?.(images.filter((item) => item.key !== img.key));
    setDeleteTarget(null);
  };

  return (
    <>
      {Boolean(images?.length) && (
        <ImageList cols={cols} rowHeight={size}>
          {images.map((item) => (
            <ImageListItem key={item.key} sx={{ position: "relative" }}>
              <Image
                src={imageLoader({ ...item, size })}
                width={100}
                height={100}
                loading="lazy"
                alt=""
                style={{ opacity: item.uploading ? 0.5 : 1 }}
              />
              {item.uploading && (
                <CircularProgress
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "primary.main",
                  }}
                  size={40}
                />
              )}
              {showingDelete && (
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                  size="small"
                  onClick={() => setDeleteTarget(item)}
                >
                  <DeleteIcon sx={{ color: "white" }} fontSize="small" />
                </IconButton>
              )}
            </ImageListItem>
          ))}
        </ImageList>
      )}

      <Dialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this image?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button
            onClick={() => deleteTarget && handleDelete(deleteTarget)}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
