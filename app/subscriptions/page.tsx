"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function Page() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
    >
      <Tab label="人" />
      <Tab label="动漫" />
      <Tab label="话题" />
      <Tab label="自定义分组" />
      <Tab label="自定义分组" />
      <Tab label="自定义分组" />
      <Tab label="自定义分组" />
      <Tab label="自定义分组" />
    </Tabs>
  );
}
