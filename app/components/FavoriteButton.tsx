"use client";

import useSWRFetcher from "@/hooks/useSWRFetcher";
import { addTrackItem, removeTrackItem } from "@/services/item";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { showToast } from "./Toast";

function FavoriteButton({ id }: { id?: string }) {
  const { data, error, isLoading } = useSWRFetcher<{
    favorite: boolean;
  }>(`/api/get-item-favorite/${id}`);

  const [favorite, setFavorite] = useState<boolean>();

  useEffect(() => {
    if (data?.favorite !== undefined) {
      setFavorite(data.favorite);
    } else {
      setFavorite(undefined);
    }
  }, [data]);

  return (
    <IconButton
      aria-label="add to favorites"
      disabled={!id || error || isLoading || favorite === undefined}
      color={favorite ? "primary" : "default"}
      onClick={async () => {
        if (!favorite) {
          await addTrackItem({
            itemId: id,
          });

          showToast("Success add to favorites");
          setFavorite(true);
        } else {
          await removeTrackItem({
            itemId: id,
          });

          showToast("Success remove from favorites");
          setFavorite(false);
        }
      }}
    >
      <FavoriteIcon />
    </IconButton>
  );
}

export default FavoriteButton;
