"use client";

import PostImageList from "@/app/components/PostImagePreviewList";
import { ContentType, IPostContent } from "@/app/types";
import { isValidUrl } from "@/utils/url";
import { Typography } from "@mui/material";
import UrlComponent from "./UrlComponent";

function getLine(str) {
  if (isValidUrl(str)) {
    return <UrlComponent key={null} url={str}></UrlComponent>;
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
                // show empty line
                minHeight: "1em",
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
