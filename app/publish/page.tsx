"use client";

import ImageUploader from "@/app/components/ImageUploader";
import { PrivatePageGuard } from "@/components/PrivatePageGuard";
import { createItem } from "@/services/item";
import { createPost, increaseHomePostsKey } from "@/services/post";
import { Stack, Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ContentType, ImageItem, ItemType } from "../types";
import AnimeForm from "./components/AnimeForm";
import ComicForm from "./components/ComicForm";

export default function MultilineTextFields() {
  const [text, setText] = useState("");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [value, setValue] = useState("post");
  const router = useRouter();

  async function submit() {
    const contents = [
      {
        type: ContentType.TEXT,
        content: text,
      },
      ...images
        .filter((img) => img.img)
        .map((img) => {
          return {
            type: ContentType.IMAGE,
            content: img.img,
          };
        }),
    ];

    const result = await createPost({
      contents,
    });

    if (result) {
      increaseHomePostsKey();
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
            <Stack spacing={2}>
              <TextField
                value={text}
                onChange={(event) => setText(event.target.value)}
                id="outlined-multiline-static"
                label="Text"
                multiline
                rows={4}
              />
              
              <Box>
                <ImageUploader
                  images={images}
                  onChange={setImages}
                  showingDelete={true}
                />
              </Box>

              <Button sx={{ w: "100%" }} variant="contained" onClick={submit}>
                Post
              </Button>
            </Stack>
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
