"use client";

import { Box, Link } from "@mui/material";

enum YOUTUBE_VIDEO_TYPE {
  VIDEO,
  SHORT,
}

const youtubeVideoConfig = {
  [YOUTUBE_VIDEO_TYPE.VIDEO]: {
    width: 282,
    height: 200,
  },
  [YOUTUBE_VIDEO_TYPE.SHORT]: {
    width: 315,
    height: 560,
  },
};

function getYoutubeVideoInfo(url) {
  try {
    const urlInstance = new URL(url);
    if (urlInstance.host !== "www.youtube.com") {
      return;
    }

    const vid = urlInstance.searchParams.get("v");
    if (vid) {
      return {
        type: YOUTUBE_VIDEO_TYPE.VIDEO,
        id: vid,
      };
    }

    const paths = urlInstance.pathname.split("/");
    const sid = paths[2];
    if (paths[1] === "shorts" && sid) {
      return {
        type: YOUTUBE_VIDEO_TYPE.SHORT,
        id: sid,
      };
    }
  } catch (error) {
    console.error(error);
    return;
  }
}

export default function UrlComponent(props: { url: string }) {
  const { url } = props;
  const youtubeVideoInfo = getYoutubeVideoInfo(url);
  const youtubeVideoId = youtubeVideoInfo?.id;
  const youtubeVideoType = youtubeVideoInfo?.type || YOUTUBE_VIDEO_TYPE.VIDEO;

  let content;

  if (youtubeVideoId) {
    const config = youtubeVideoConfig[youtubeVideoType];

    content = (
      <iframe
        className="videoEmbed"
        width={config.width}
        height={config.height}
        loading="lazy"
        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
        title="YouTube"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    );
  }

  return (
    <Box>
      <Link href={url} target={"_blank"}>
        {url}
      </Link>
      {content}
    </Box>
  );
}
