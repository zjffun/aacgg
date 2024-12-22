"use client";

import useSWRFetcher from "@/hooks/useSWRFetcher";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import getSubItems from "../common/getSubItems";
import FavoriteButton from "../components/FavoriteButton";
import ProgressButton from "../components/ProgressButton";
import useProgress from "../hooks/useProgress";
import { IAnime, IEpisode, IProgress } from "../types";

function EpisodeItem({
  progress,
  id,
  name,
}: IEpisode & { progress?: IProgress[] }) {
  const currentWatched = progress?.some((d) => d.id === id);

  return <Button color={currentWatched ? "success" : "primary"}>{name}</Button>;
}

function Content() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const { progress, updateProgress } = useProgress({ id });

  const { data, error, isLoading } = useSWRFetcher<IAnime>(
    `/api/get-item/${id}`
  );

  const subItem = getSubItems(data);

  if (!id) {
    return <div>no id</div>;
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      {data?.name && (
        <Typography gutterBottom variant="subtitle1">
          {data?.name}
        </Typography>
      )}

      {data?.desc && (
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          {data?.desc}
        </Typography>
      )}

      <Stack direction="row" spacing={1}>
        <FavoriteButton id={data?._id}></FavoriteButton>
        <ProgressButton
          itemId={data?._id}
          progress={progress}
          subItem={subItem}
          updateProgress={updateProgress}
        ></ProgressButton>
      </Stack>

      <Stack direction="row" sx={{ flexWrap: "wrap" }} spacing={0}>
        {subItem.map((c) => (
          <EpisodeItem key={c.id} {...c} progress={progress}></EpisodeItem>
        ))}
      </Stack>

      <Button
        onClick={() => {
          const searchParams = new URLSearchParams();
          searchParams.set("id", id);

          router.push(`/item-detail/edit?${searchParams}`);
        }}
      >
        Edit
      </Button>
    </Box>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
