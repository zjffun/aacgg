"use client";

import { createPost } from "@/services/post";
import uploadImages from "@/services/uploadImages";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import PostImageList from "../components/PostImageList";
import { ContentType } from "../types";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function MultilineTextFields() {
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);

  async function submit() {
    const contents = [
      {
        type: ContentType.TEXT,
        content: text,
      },
      ...images.map((img) => {
        return {
          type: ContentType.IMAGE,
          content: img,
        };
      }),
    ];

    const result = createPost({
      contents,
    });
  }

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { width: "100%" }, padding: 2 }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          value={text}
          onChange={(event) => setText(event.target.value)}
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
        />
        <PostImageList images={images} />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={async (event) => {
              if (!event.target.files?.length) return;
              const result = await uploadImages([...event.target.files]);

              setImages((imgs) => {
                return [...imgs, ...result];
              });
            }}
            multiple
          />
        </Button>
        <Button onClick={submit}>提交</Button>
      </div>
    </Box>
  );
}
