"use client";

import useSWRFetcher from "@/hooks/useSWRFetcher";
import { Box, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import ItemGrid from "../components/ItemGrid";
import { IAnime, ItemType } from "../types";

function AllItems() {
  const { data, error, isLoading } =
    useSWRFetcher<IAnime[]>(`/api/track-items`);
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>failed to load</div>;
  }

  const _data = Array.isArray(data) ? data : [];

  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <ItemGrid itemList={_data}></ItemGrid>
    </Box>
  );
}

function TarckItems() {
  const { data, error, isLoading } = useSWRFetcher<IAnime[]>(
    `/api/track-items`,
    {
      type: ItemType.ANIME,
    }
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>failed to load</div>;
  }

  const _data = Array.isArray(data) ? data : [];

  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <ItemGrid itemList={_data}></ItemGrid>
    </Box>
  );
}

function ComicItems() {
  const { data, error, isLoading } = useSWRFetcher<IAnime[]>(
    `/api/track-items`,
    {
      type: ItemType.COMIC,
    }
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>failed to load</div>;
  }

  const _data = Array.isArray(data) ? data : [];

  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <ItemGrid itemList={_data}></ItemGrid>
    </Box>
  );
}

export default function Page() {
  const [value, setValue] = useState("All");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All" value="All" />
          <Tab label="Anime" value={ItemType.ANIME} />
          <Tab label="Comic" value={ItemType.COMIC} />
        </Tabs>
      </Box>
      {value === "All" && <AllItems></AllItems>}
      {value === ItemType.ANIME && <TarckItems></TarckItems>}
      {value === ItemType.COMIC && <ComicItems></ComicItems>}
    </Box>
  );
}
