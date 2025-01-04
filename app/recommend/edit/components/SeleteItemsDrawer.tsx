"use client";

import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { IItem } from "@/app/types";
import useSWRFetcher from "@/hooks/useSWRFetcher";
import { ListItemButton } from "@mui/material";

interface SelectItemsDrawerProps {
  open: boolean;
  onAdd: (items: IItem[]) => void;
  onClose: () => void;
}

const SelectItemsDrawer: React.FC<SelectItemsDrawerProps> = ({
  open,
  onAdd,
  onClose,
}) => {
  const [items, setItems] = useState<(IItem & { selected: boolean })[]>([]);
  const { data, error, isLoading } = useSWRFetcher<IItem[]>(`/api/all-items`);

  useEffect(() => {
    const items = (Array.isArray(data) ? data : []).map((item) => ({
      ...item,
      selected: false,
    }));
    setItems(items);
  }, [data]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List>
        {items.map((item) => (
          <ListItemButton
            key={item._id}
            selected={item.selected}
            onClick={() => {
              setItems((items) => {
                return items.map((i) => {
                  if (i._id === item._id) {
                    return {
                      ...i,
                      selected: !i.selected,
                    };
                  }
                  return i;
                });
              });
            }}
          >
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>
      <Button
        onClick={() => {
          const addItems = items.filter((item) => item.selected);
          onAdd(addItems);
        }}
      >
        Add
      </Button>
      <Button onClick={onClose}>Close</Button>
    </Drawer>
  );
};

export default SelectItemsDrawer;
