"use client";

import { IEpisode } from "@/services/item";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { ObjectId } from "bson";

export interface IAnime {
  _id?: string;
  name: string;
  desc: string;
  episodes: IEpisode[];
}

export default function MultilineTextFields({
  anime,
  onSubmit,
}: {
  anime?: IAnime;
  onSubmit?: (anime: IAnime) => void;
}) {
  const [name, setName] = useState(anime?.name || "");
  const [desc, setDesc] = useState(anime?.desc || "");
  const [episodes, setEpisodes] = useState(anime?.episodes || []);

  async function submit() {
    onSubmit?.({
      name,
      desc,
      episodes,
    });
  }

  function addEpisode() {
    setEpisodes([
      {
        id: new ObjectId().toString(),
        name: String(episodes.length + 1),
      },
      ...episodes,
    ]);
  }

  function add10Episode() {
    const addEpisodes = Array.from({ length: 10 }, (_, i) => ({
      id: new ObjectId().toString(),
      name: String(episodes.length + 1 + i),
    }));

    setEpisodes([...addEpisodes.reverse(), ...episodes]);
  }

  function removeEpisode(id: string) {
    setEpisodes(episodes.filter((d) => d.id !== id));
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
          <Button onClick={addEpisode}>Add Episode</Button>
          <Button onClick={add10Episode}>Add 10 Episode</Button>
          <ul>
            {episodes.map((c) => (
              <li key={c.id}>
                {c.name}
                <Button onClick={() => removeEpisode(c.id)}>Remove</Button>
              </li>
            ))}
          </ul>
        </div>

        <Button onClick={submit}>Submit</Button>
      </div>
    </Box>
  );
}
