"use client";

import { IPost } from "@/app/types";
import { PrivatePageGuard } from "@/components/PrivatePageGuard";
import { useSearchParams } from "next/navigation";
import PostForm from "../../publish/components/PostForm";
import { Suspense } from "react";
import useSWRFetcher from "@/hooks/useSWRFetcher";
import { getPostsRefreshKey } from "@/services/post";

function Content() {
  const param = useSearchParams();
  const id = param.get("id");

  const { isLoading, error, data } = useSWRFetcher<IPost>(
    `/api/my-post/${id}`,
    {
      key: getPostsRefreshKey(),
      id: id || "",
    },
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <PrivatePageGuard>
      <PostForm data={data}></PostForm>
    </PrivatePageGuard>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
