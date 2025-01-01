"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { IItem } from "../types";
import imageLoader from "../common/imageLoader";

export default function ItemCard({ item }: { item: IItem }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {item.coverImage && (
          <CardMedia
            component="img"
            height="140"
            image={imageLoader({ img: item.coverImage, size: 140 })}
            alt={`${item.name} cover`}
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="subtitle1">
            {item.name}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {item.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
