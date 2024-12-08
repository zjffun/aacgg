"use client";

import useSWRFetcher from "@/hooks/useSWRFetcher";
import { updateItem } from "@/services/item";
import { Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import AnimeForm, { IAnime } from "../../publish/components/AnimeForm";
import { Suspense } from "react";

function Content() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const { data, error, isLoading } = useSWRFetcher<IAnime>(
    `/api/get-item/${id}`
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <AnimeForm
        anime={data}
        onSubmit={async (data) => {
          const result = await updateItem({ ...data, id });

          if (result) {
            router.back();
          }
        }}
      ></AnimeForm>
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
