"use client";

import { Box, Link } from "@mui/material";

function getYoutubeVideoId(url) {
  try {
    const urlInstance = new URL(url);
    if (urlInstance.host === "www.youtube.com") {
      return urlInstance.searchParams.get("v");
    }
  } catch (error) {
    console.error(error);
    return "";
  }
}

export default function UrlComponent(props: { url: string }) {
  const { url } = props;
  const youtubeVideoId = getYoutubeVideoId(url);

  return (
    <Box>
      {youtubeVideoId && (
        <iframe
          className="videoEmbed"
          width="282"
          height="200"
          loading="lazy"
          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
          title="YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
      <Link href={url} target={"_blank"}>
        {url}
      </Link>
    </Box>
  );
}
