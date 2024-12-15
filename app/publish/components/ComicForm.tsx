"use client";

import { IChapters, ItemType } from "@/services/item";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { ObjectId } from "bson";

export interface IComic {
  _id?: string;
  type: ItemType;
  name: string;
  desc: string;
  chapters: IChapters[];
}

export default function MultilineTextFields({
  comic: comic,
  onSubmit,
}: {
  comic?: IComic;
  onSubmit?: (anime: IComic) => void;
}) {
  const [name, setName] = useState(comic?.name || "");
  const [desc, setDesc] = useState(comic?.desc || "");
  const [chapters, setChapters] = useState(comic?.chapters || []);

  async function submit() {
    onSubmit?.({
      type: ItemType.COMIC,
      name,
      desc,
      chapters,
    });
  }

  function addChapter() {
    setChapters([
      {
        id: new ObjectId().toString(),
        name: String(chapters.length + 1),
      },
      ...chapters,
    ]);
  }

  function add10Chapter() {
    const addChapters = Array.from({ length: 10 }, (_, i) => ({
      id: new ObjectId().toString(),
      name: String(chapters.length + 1 + i),
    }));

    setChapters([...addChapters.reverse(), ...chapters]);
  }

  function removeChapter(id: string) {
    setChapters(chapters.filter((d) => d.id !== id));
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

        <div>
          <Button onClick={addChapter}>Add Chapter</Button>
          <Button onClick={add10Chapter}>Add 10 Chapters</Button>
          <ul>
            {chapters.map((c) => (
              <li key={c.id}>
                {c.name}
                <Button onClick={() => removeChapter(c.id)}>Remove</Button>
              </li>
            ))}
          </ul>
        </div>

        <Button onClick={submit}>Submit</Button>
      </div>
    </Box>
  );
}
