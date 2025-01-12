"use client";

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
    <PostList newData={newData} error={error} isLoading={isLoading}></PostList>
  );
}
