"use client";

import { createItem } from "@/services/item";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MultilineTextFields() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const router = useRouter();

  async function submit() {
    const result = await createItem({
      name,
      desc,
    });

    if (result) {
      router.back();
    }
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
          value={name}
          onChange={(event) => setName(event.target.value)}
          label="Name"
        />
        <TextField
          value={desc}
          onChange={(event) => setDesc(event.target.value)}
          label="Description"
          multiline
          rows={4}
        />
        <Button onClick={submit}>提交</Button>
      </div>
    </Box>
  );
}
