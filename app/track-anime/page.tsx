"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { Box, Button, Tab, Tabs } from "@mui/material";
import useSWRFetcher from "@/hooks/useSWRFetcher";
import { useState } from "react";
import { addTrackItem } from "@/services/item";

function ItemContent({ id, name, desc }) {
  return (
    <div>
      <div>{name}</div>
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
  const { data, error, isLoading } = useSWRFetcher<any[]>(`/api/all-items`);
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
  const { data, error, isLoading } = useSWRFetcher<any[]>(`/api/track-items`);

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
  const [value, setValue] = useState("my");
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
          <Tab label="My" value="my" />
          <Tab label="All" value="all" />
        </Tabs>
      </Box>
      {value === "my" && <TarckItems></TarckItems>}
      {value === "all" && <AllItems></AllItems>}
    </Box>
  );
}
