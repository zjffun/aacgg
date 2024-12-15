"use client";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";

const size = 164;
const cols = 3;

const imageLoader = ({ src, size }: { src: string; size: number }) => {
  return `https://aacgg.com/cdn-cgi/image/width=${size},height=${size},fix=crop,format=auto,quality=75/https://r2.aacgg.com/${src}`;
};

export default function PostImageList({ images }: { images: string[] }) {
  return (
    <ImageList cols={cols} rowHeight={size}>
      {images.map((img) => (
        <ImageListItem key={img}>
          <Image
            // loader not work when using 'output: export'
            // loader={imageLoader}
            src={imageLoader({ src: img, size })}
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
