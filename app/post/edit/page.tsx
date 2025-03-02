"use client";

import { IPost } from "@/app/types";
import { PrivatePageGuard } from "@/components/PrivatePageGuard";
import fetcher from "@/services/fetcher";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import PostForm from "../../publish/components/PostForm";
import { Suspense } from "react";

function Content() {
  const param = useSearchParams();
  const id = param.get("id");

  const { isLoading, error, data } = useSWR<IPost>(
    `/api/my-post/${id}`,
    fetcher,
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
