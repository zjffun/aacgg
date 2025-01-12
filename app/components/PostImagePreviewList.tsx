"use client";

import Image from "next/image";
import { PhotoProvider } from "react-photo-view";
import imageLoader from "../common/imageLoader";
import { PhotoView } from "react-photo-view";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import "react-photo-view/dist/react-photo-view.css";

const size = 164;
const cols = 3;

export default function ImagePreviewList({ images }: { images }) {
  return (
    <PhotoProvider>
      <ImageList cols={cols} rowHeight={size}>
        {images.map((item) => (
          <PhotoView
            key={item.img}
            src={imageLoader({ ...item, usingOriginalUrl: true })}
          >
            <ImageListItem sx={{ position: "relative" }}>
              <Image
                src={imageLoader({ ...item, size })}
                width={164}
                height={164}
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
