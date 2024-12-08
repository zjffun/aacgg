"use client";

import useSWRFetcher from "@/hooks/useSWRFetcher";
import { Box, Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { IAnime } from "../publish/components/AnimeForm";
import { IEpisode, markWathcedEpisodes } from "@/services/item";
import { Suspense, useState } from "react";

function EpisodeItem({
  itemId,
  id,
  name,
  watched,
}: IEpisode & { itemId: string }) {
  const [currentWatched, setCurrentWatched] = useState(watched);

  const toggleWatched = async () => {
    if (!currentWatched) {
      const result = await markWathcedEpisodes({
        itemId,
        episodeIds: [id],
      });

      if (result) {
        setCurrentWatched(true);
      }
    }
  };

  return (
    <>
      {name}
      <Button onClick={() => toggleWatched()}>
        {currentWatched ? "watched" : "unwatched"}
      </Button>
    </>
  );
}

function Content() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const { data, error, isLoading } = useSWRFetcher<IAnime>(
    `/api/get-item/${id}`
  );

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
    <Box sx={{ width: "100%" }}>
      <div>{data?.name}</div>
      <div>{data?.desc}</div>
      <ul>
        {data?.episodes.map((c) => (
          <li key={c.id}>
            <EpisodeItem itemId={id} {...c}></EpisodeItem>
          </li>
        ))}
      </ul>

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
