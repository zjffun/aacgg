"use client";

import PostImageList from "@/app/components/PostImagePreviewList";
import { ContentType, IPostContent } from "@/app/types";

export default function PostContents(props: { contents: IPostContent[] }) {
  const text = props.contents.filter((item) => item.type === ContentType.TEXT);
  const images = props.contents.filter(
    (item) => item.type === ContentType.IMAGE
  );

  return (
    <div>
      {text.map((item) => {
        return <p key={null}>{item.content}</p>;
      })}

      <PostImageList
        images={images.map((item) => ({
          key: item.content,
          img: item.content,
        }))}
      />
    </div>
  );
}
