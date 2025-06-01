"use client";

import GoBackAppBar from "@/app/components/GoBackAppBar";
import PostList from "@/app/components/PostList";
import { IPost } from "@/app/types";
import useSWRFetcher from "@/hooks/useSWRFetcher";
import { getPostsRefreshKey } from "@/services/post";
import { useState } from "react";

export default function Page() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [lastItemCreateTime, setLastItemCreateTime] = useState<string>("");

  const {
    data: newData,
    error,
    isLoading,
  } = useSWRFetcher<IPost[]>(`/api/current-user-posts`, {
    key: getPostsRefreshKey(),
    time: lastItemCreateTime,
    search: searchValue,
  });

  return (
    <>
      <GoBackAppBar title="Your Content"></GoBackAppBar>

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
        showingPublicChip={true}
      ></PostList>
    </>
  );
}
