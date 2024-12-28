"use client";

import { createPost } from "@/services/post";
import uploadImages from "@/services/uploadImages";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PostImageList from "../components/PostImageList";
import { ContentType, ItemType } from "../types";
import AnimeForm from "./components/AnimeForm";
import ComicForm from "./components/ComicForm";
import { createItem } from "@/services/item";
import { PrivatePageGuard } from "@/components/PrivatePageGuard";

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
  const [value, setValue] = useState("post");
  const router = useRouter();

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

    const result = await createPost({
      contents,
    });

    if (result) {
      router.back();
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <PrivatePageGuard>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Post" value="post" />
            <Tab label="Anime" value={ItemType.ANIME} />
            <Tab label="Comic" value={ItemType.COMIC} />
          </Tabs>
        </Box>
        {value === "post" && (
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
                label="Text"
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
        )}
        {value === ItemType.ANIME && (
          <AnimeForm
            onSubmit={async (data) => {
              const result = await createItem(data);

              if (result) {
                router.back();
              }
            }}
          ></AnimeForm>
        )}
        {value === ItemType.COMIC && (
          <ComicForm
            onSubmit={async (data) => {
              const result = await createItem(data);

              if (result) {
                router.back();
              }
            }}
          ></ComicForm>
        )}
      </Box>
    </PrivatePageGuard>
  );
}
