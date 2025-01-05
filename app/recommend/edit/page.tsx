"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import fetcher from "@/services/fetcher";
import { IItem } from "../../types";
import Image from "next/image";
import getImageUrl from "../../common/getImageUrl";
import { Box, Button, Container, Paper, ToggleButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SelectItemsDrawer from "./components/SeleteItemsDrawer";
import { createRecommend, updateRecommend } from "@/services/recommend";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

function SortableItem({ item, onDelete, disabled }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const src = getImageUrl(item.coverImage);

  return (
    <Grid size={4} style={style} {...attributes} {...listeners}>
      <div ref={setNodeRef}>
        <Paper
          sx={{
            height: "100%",
          }}
        >
          <Image
            src={src}
            width={90}
            height={127}
            loading="lazy"
            alt={item.name}
            style={{
              aspectRatio: "1 / 1.414",
              width: "100%",
            }}
          />
          <label>{item.name}</label>
          <div>
            {disabled && (
              <Button
                onClick={() => {
                  onDelete();
                }}
              >
                Delete
              </Button>
            )}
          </div>
        </Paper>
      </div>
    </Grid>
  );
}

type IItemWithId = IItem & { id: string };

export default function RecommendPage() {
  const router = useRouter();

  const { isLoading, error, data } = useSWR<{
    id: string;
    items: IItem[];
  }>(`/api/my-recommend`, fetcher);
  const { user, isError: isErrorUser, isLoading: isLoadingUser } = useUser();

  const [open, setOpen] = useState(false);
  const [sortItem, setSortItem] = useState(false);
  const [items, setItems] = useState<IItemWithId[]>([]);

  useEffect(() => {
    if (data?.items) {
      setItems(getItemsWithId(data.items));
    } else {
      setItems([]);
    }
  }, [data]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // activationConstraint: {
      //   delay: 200,
      //   tolerance: 10,
      // },
    }),
    useSensor(TouchSensor, {
      // activationConstraint: {
      //   delay: 200,
      //   tolerance: 10,
      // },
    })
  );

  if (isLoading || isLoadingUser) {
    return <div>loading...</div>;
  }

  if (error || isErrorUser) {
    return <div>failed to load</div>;
  }

  function getItemsWithId(items: IItem[]) {
    return items.map((item) => ({
      ...item,
      id: item._id as string,
    }));
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  function handleSave() {
    const itemIds = items.map((item) => item._id);

    if (!data?.id) {
      createRecommend({
        itemIds,
      });
      return;
    }

    updateRecommend({
      itemIds,
    });
    return;
  }

  return (
    <Container maxWidth="lg">
      <Box>
        <Button onClick={() => setOpen(true)}>Add Recommned Items</Button>
        <Button onClick={handleSave}>Save</Button>
        <Button
          onClick={() => {
            const searchParams = new URLSearchParams({
              name: user?.login,
            });
            router.push(`/recommend?${searchParams}`);
          }}
        >
          Preview
        </Button>
        <Button
          onClick={() => {
            const searchParams = new URLSearchParams({
              name: user?.login,
              screenshot: "true",
            });
            router.push(`/recommend?${searchParams}`);
          }}
        >
          Screenshot
        </Button>
      </Box>
      <Box>
        <ToggleButton
          color="primary"
          value="sortItem"
          selected={sortItem}
          onChange={() => setSortItem((prevSelected) => !prevSelected)}
        >
          Drag Sort
        </ToggleButton>
      </Box>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          disabled={!sortItem}
          items={items}
          strategy={rectSortingStrategy}
        >
          <Grid container spacing={3}>
            {items.map((item) => (
              <SortableItem
                disabled={!sortItem}
                key={item.id}
                item={item}
                onDelete={() => {
                  setItems((prev) =>
                    prev.filter((prevItem) => prevItem.id !== item.id)
                  );
                }}
              />
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
      <SelectItemsDrawer
        open={open}
        onAdd={(items) => {
          setItems((prev) => [...prev, ...getItemsWithId(items)]);
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      ></SelectItemsDrawer>
    </Container>
  );
}
