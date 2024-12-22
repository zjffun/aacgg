"use client";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import imageLoader from "../common/imageLoader";

const size = 164;
const cols = 3;

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
