"use client";

import { IAnime, IComic, ItemType } from "@/app/types";
import { useRouter } from "@/hooks/useNavRouter";
import useSWRFetcher from "@/hooks/useSWRFetcher";
import { updateItem } from "@/services/item";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AnimeForm from "../../publish/components/AnimeForm";
import ComicForm from "../../publish/components/ComicForm";

function Content() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const { data, error, isLoading } = useSWRFetcher<IAnime | IComic>(
    `/api/get-item/${id}`,
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>failed to load</div>;
  }

  const renderForm = () => {
    if (!data) return null;

    switch (data.type) {
      case ItemType.ANIME:
        return (
          <AnimeForm
            anime={data as IAnime}
            onSubmit={async (formData) => {
              const result = await updateItem({ ...formData, id });
              if (result) {
                router.back();
              }
            }}
          />
        );
      case ItemType.COMIC:
        return (
          <ComicForm
            comic={data as IComic}
            onSubmit={async (formData) => {
              const result = await updateItem({ ...formData, id });
              if (result) {
                router.back();
              }
            }}
          />
        );
      default:
        return <div>Unsupported item type</div>;
    }
  };

  return (
    <>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={router.back}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Edit {data?.name || "Item"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 2 }}>{renderForm()}</Box>
    </>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
