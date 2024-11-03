"use client";

import PostImageList from "@/app/components/PostImageList";
import { ContentType, IPostContent } from "@/app/types";
import fetcher from "@/services/fetcher";
import useSWR from "swr";

function Contents(props: { contents: IPostContent[] }) {
  const text = props.contents.filter((item) => item.type === ContentType.TEXT);
  const images = props.contents.filter(
    (item) => item.type === ContentType.IMAGE
  );

  return (
    <div>
      {text.map((item) => {
        return <p key={null}>{item.content}</p>;
      })}

      <PostImageList images={images.map((item) => item.content)} />
    </div>
  );
}

export default function Page() {
  const { data, error, isLoading } = useSWR(`/api/current-user-posts`, fetcher);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <Contents contents={item.contents}></Contents>
          </li>
        ))}
      </ul>
    </div>
  );
}
