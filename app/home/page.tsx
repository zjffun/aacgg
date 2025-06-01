"use client";

import useSWRFetcher from "@/hooks/useSWRFetcher";
import { getPostsRefreshKey } from "@/services/post";
import { useState } from "react";
import PostList from "../components/PostList";
import { IPost } from "../types";

export default function Page() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [lastItemCreateTime, setLastItemCreateTime] = useState<string>("");

  const {
    data: newData,
    error,
    isLoading,
  } = useSWRFetcher<IPost[]>(`/api/home-posts`, {
    key: getPostsRefreshKey(),
    time: lastItemCreateTime,
    search: searchValue,
  });

  return (
    <PostList
      onSearch={(value) => {
        if (value !== searchValue) {
          setSearchValue(value);
          setLastItemCreateTime("");
          window.scrollTo(0, 0);
        }
      }}
      searchValue={searchValue}
      newData={newData}
      error={error}
      isLoading={isLoading}
      changeLastItemCreateTime={setLastItemCreateTime}
    ></PostList>
  );
}
