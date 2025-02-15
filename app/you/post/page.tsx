"use client";

import GoBackAppBar from "@/app/components/GoBackAppBar";
import PostList from "@/app/components/PostList";
import { IPost } from "@/app/types";
import fetcher from "@/services/fetcher";
import useSWR from "swr";

export default function Page() {
  const {
    data: newData,
    error,
    isLoading,
  } = useSWR<IPost[]>(`/api/current-user-posts`, fetcher);

  return (
    <>
      <GoBackAppBar title="Your Content"></GoBackAppBar>
      <PostList
        newData={newData}
        error={error}
        isLoading={isLoading}
      ></PostList>
    </>
  );
}
