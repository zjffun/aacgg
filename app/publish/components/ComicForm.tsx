"use client";

import { IComic, ImageItem, ItemType } from "@/app/types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ObjectId } from "bson";
import { useState } from "react";
import { Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import { SingleImageUploader } from "@/app/components/ImageUploader";

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
  const [coverImage, setCoverImage] = useState<ImageItem>();

  async function submit() {
    onSubmit?.({
      type: ItemType.COMIC,
      name,
      desc,
      chapters,
      coverImage: coverImage?.img,
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
          <Button variant="contained" onClick={addChapter}>
            Add Chapter
          </Button>
          <Button variant="outlined" onClick={add10Chapter}>
            Add 10 Chapters
          </Button>
        </Stack>

        <Grid container spacing={1}>
          {chapters.map((c) => (
            <Grid key={c.id} size={2}>
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
                  {c.name}
                </Box>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => removeChapter(c.id)}
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
