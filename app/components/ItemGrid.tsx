"use client";

import { useRouter } from "@/hooks/useNavRouter";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { IItem } from "../types";
import ItemCard from "./ItemCard";
import { showToast } from "./Toast";

export default function ItemGrid({ itemList }: { itemList: IItem[] }) {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {itemList.map((item) => (
          <Grid
            key={item._id}
            size={4}
            onClick={() => {
              if (!item._id) {
                showToast("Can not get item id.");
                return;
              }

              const searchParams = new URLSearchParams();
              searchParams.set("id", item._id);
              router.push(`/item-detail?${searchParams}`);
            }}
          >
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
