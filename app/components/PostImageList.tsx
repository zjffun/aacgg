"use client";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";

const imageLoader = ({ src }: { src: string }) => {
  return `https://r2.aacgg.com/${src}`;
};

export default function PostImageList({ images }: { images: string[] }) {
  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {images.map((img) => (
        <ImageListItem key={img}>
          <Image
            // loader not work when using 'output: export'
            // loader={imageLoader}
            src={imageLoader({ src: img })}
            width={100}
            height={100}
            loading="lazy"
            alt=""
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
