"use client";

import * as React from "react";
import Masonry from "@mui/lab/Masonry";
import { Box, Button, Tab, Tabs } from "@mui/material";
import useSWRFetcher from "@/hooks/useSWRFetcher";
import { useState } from "react";
import { addTrackItem, ItemType } from "@/services/item";
import { useRouter } from "next/navigation";
import { IAnime } from "../publish/components/AnimeForm";

function ItemContent({ id, name, desc }) {
  const router = useRouter();

  return (
    <div>
      <div
        onClick={() => {
          const searchParams = new URLSearchParams();
          searchParams.set("id", id);
          router.push(`/item-detail?${searchParams}`);
        }}
      >
        {name}
      </div>
      <div>{desc}</div>
      <Button
        onClick={() => {
          addTrackItem({
            itemId: id,
          });
        }}
      >
        Tarck
      </Button>
    </div>
  );
}

function AllItems() {
  const { data, error, isLoading } = useSWRFetcher<IAnime[]>(`/api/all-items`);
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
      <Masonry columns={2} spacing={2}>
        {_data.map((d) => (
          <ItemContent
            key={d._id}
            id={d._id}
            name={d.name}
            desc={d.desc}
          ></ItemContent>
        ))}
      </Masonry>
    </Box>
  );
}

function TarckItems() {
  const { data, error, isLoading } = useSWRFetcher<IAnime[]>(`/api/all-items`, {
    type: ItemType.ANIME,
  });

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
      <Masonry columns={2} spacing={2}>
        {_data.map((d) => (
          <ItemContent
            key={d._id}
            id={d._id}
            name={d.name}
            desc={d.desc}
          ></ItemContent>
        ))}
      </Masonry>
    </Box>
  );
}

function ComicItems() {
  const { data, error, isLoading } = useSWRFetcher<IAnime[]>(`/api/all-items`, {
    type: ItemType.COMIC,
  });

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
      <Masonry columns={2} spacing={2}>
        {_data.map((d) => (
          <ItemContent
            key={d._id}
            id={d._id}
            name={d.name}
            desc={d.desc}
          ></ItemContent>
        ))}
      </Masonry>
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
          <Tab label="Anime" value="Anime" />
          <Tab label="Comic" value="Comic" />
        </Tabs>
      </Box>
      {value === "All" && <AllItems></AllItems>}
      {value === "Anime" && <TarckItems></TarckItems>}
      {value === "Comic" && <ComicItems></ComicItems>}
    </Box>
  );
}
