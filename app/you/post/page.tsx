"use client";

import GoBackAppBar from "@/app/components/GoBackAppBar";
import PostList from "@/app/components/PostList";
import { IPost } from "@/app/types";
import useSWRFetcher from "@/hooks/useSWRFetcher";
import { useState } from "react";

export default function Page() {
  const [lastItemCreateTime, setLastItemCreateTime] = useState<string>("");

  const {
    data: newData,
    error,
    isLoading,
  } = useSWRFetcher<IPost[]>(`/api/current-user-posts`, {
    time: lastItemCreateTime,
  });

  return (
    <>
      <GoBackAppBar title="Your Content"></GoBackAppBar>
      <PostList
        newData={newData}
        error={error}
        isLoading={isLoading}
        changeLastItemCreateTime={setLastItemCreateTime}
      ></PostList>
    </>
  );
}
