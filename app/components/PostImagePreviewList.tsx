"use client";

import Image from "next/image";
import { PhotoProvider } from "react-photo-view";
import imageLoader from "../common/imageLoader";
import { PhotoView } from "react-photo-view";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import "react-photo-view/dist/react-photo-view.css";

const size = 300;
const maxCols = 3;

export default function ImagePreviewList({ images }: { images }) {
  const cols = Math.min(Math.max(images.length, 1), maxCols);

  return (
    <PhotoProvider>
      <ImageList cols={cols}>
        {images.map((item) => (
          <PhotoView
            key={item.img}
            src={imageLoader({ ...item, usingOriginalUrl: true })}
          >
            <ImageListItem sx={{ maxHeight: "24rem", overflow: "hidden" }}>
              <Image
                src={imageLoader({ ...item, size })}
                width={300}
                height={300}
                loading="lazy"
                alt=""
              />
            </ImageListItem>
          </PhotoView>
        ))}
      </ImageList>
    </PhotoProvider>
  );
}
