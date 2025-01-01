"use client";

import { IAnime, ImageItem, ItemType } from "@/app/types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ObjectId } from "bson";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import { SingleImageUploader } from "@/app/components/ImageUploader";

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
  const [coverImage, setCoverImage] = useState<ImageItem>();

  async function submit() {
    onSubmit?.({
      type: ItemType.ANIME,
      name,
      desc,
      episodes,
      coverImage: coverImage?.img,
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

  function add10Episodes() {
    const addEpisodes = Array.from({ length: 10 }, (_, i) => ({
      id: new ObjectId().toString(),
      name: String(episodes.length + 1 + i),
    }));

    setEpisodes([...addEpisodes.reverse(), ...episodes]);
  }

  function removeEpisode(id: string) {
    setEpisodes(episodes.filter((d) => d.id !== id));
  }

  useEffect(() => {
    if (anime?.coverImage) {
      setCoverImage({
        key: anime.coverImage,
        img: anime.coverImage,
      });
    }
  }, [anime?.coverImage]);

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { width: "100%" }, padding: 2 }}
      noValidate
      autoComplete="off"
    >
      <Stack spacing={2}>
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

        <SingleImageUploader
          showingDelete={true}
          image={coverImage}
          onChange={(img) => setCoverImage(img)}
        />

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={addEpisode}>
            Add Episode
          </Button>
          <Button variant="outlined" onClick={add10Episodes}>
            Add 10 Episodes
          </Button>
        </Stack>

        <Grid container spacing={1}>
          {episodes.map((episode) => (
            <Grid key={episode.id} size={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                  padding: "4px 8px",
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  {episode.name}
                </Box>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => removeEpisode(episode.id)}
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Button variant="contained" onClick={submit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
