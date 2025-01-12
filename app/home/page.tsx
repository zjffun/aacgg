"use client";

import useSWRFetcher from "@/hooks/useSWRFetcher";
import { getHomePostsRefreshKey } from "@/services/post";
import { useState } from "react";
import PostList from "../components/PostList";
import { IPost } from "../types";

export default function Page() {
  const [lastItemCreateTime, setLastItemCreateTime] = useState<string>("");

  const {
    data: newData,
    error,
    isLoading,
  } = useSWRFetcher<IPost[]>(`/api/home-posts`, {
    key: getHomePostsRefreshKey(),
    time: lastItemCreateTime,
  });

  return (
    <PostList
      newData={newData}
      error={error}
      isLoading={isLoading}
      changeLastItemCreateTime={setLastItemCreateTime}
    ></PostList>
  );
}
