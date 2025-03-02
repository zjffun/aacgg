"use client";

import PostImageList from "@/app/components/PostImagePreviewList";
import { ContentType, IPostContent } from "@/app/types";
import { isValidUrl } from "@/utils/url";
import { Link, Typography } from "@mui/material";

function getLine(str) {
  if (isValidUrl(str)) {
    return (
      <Link key={null} href={str} target={"_blank"}>
        {str}
      </Link>
    );
  }

  return str;
}

export default function PostContents(props: { contents: IPostContent[] }) {
  const text = props.contents.filter((item) => item.type === ContentType.TEXT);
  const images = props.contents.filter(
    (item) => item.type === ContentType.IMAGE,
  );

  return (
    <div>
      {text.map((item) => {
        const content = item.content || "";

        return content.split("\n").map((str) => {
          return (
            <Typography
              variant="body1"
              key={null}
              sx={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {getLine(str)}
            </Typography>
          );
        });
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
