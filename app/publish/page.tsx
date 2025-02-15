"use client";

import { PrivatePageGuard } from "@/components/PrivatePageGuard";
import { createItem } from "@/services/item";
import { Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ItemType } from "../types";
import AnimeForm from "./components/AnimeForm";
import ComicForm from "./components/ComicForm";
import PostForm from "./components/PostForm";

export default function MultilineTextFields() {
  const [value, setValue] = useState("post");
  const router = useRouter();

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
        {value === "post" && <PostForm></PostForm>}
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
