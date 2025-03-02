"use client";

import PostImageList from "@/app/components/PostImagePreviewList";
import { ContentType, IPostContent } from "@/app/types";
import { Typography } from "@mui/material";

export default function PostContents(props: { contents: IPostContent[] }) {
  const text = props.contents.filter((item) => item.type === ContentType.TEXT);
  const images = props.contents.filter(
    (item) => item.type === ContentType.IMAGE,
  );

  return (
    <div>
      {text.map((item) => {
        return (
          <Typography
            variant="body1"
            key={null}
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {item.content}
          </Typography>
        );
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
