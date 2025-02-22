"use client";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
} from "@mui/material";
import Card from "@mui/material/Card";
import { format, formatDistanceToNow } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import getAvatarUrl from "../common/getAvatarUrl";
import PostContents from "../components/PostContents";
import { IPost } from "../types";
import ActionsDrawer from "./ActionsDrawer";

function getTimeAgo(date?: Date) {
  try {
    if (!date) {
      return "";
    }
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error(error);
    return "";
  }
}

function getFormatedTime(date?: Date) {
  try {
    if (!date) {
      return "";
    }
    return format(date, "yyyy-MM-dd HH:mm:ssXXX");
  } catch (error) {
    console.error(error);
    return "";
  }
}

export default function PostList({
  newData,
  error,
  isLoading,
  changeLastItemCreateTime,
}: {
  error?: Error;
  isLoading?: boolean;
  newData?: IPost[];
  changeLastItemCreateTime?: (time: string) => void;
}) {
  const [data, setData] = useState<IPost[]>([]);
  const [end, setEnd] = useState(false);
  const [showingDrawer, setShowingDrawer] = useState(false);
  const [currentData, setCurrentData] = useState<IPost | null>(null);

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!newData) {
      return;
    }

    if (newData.length === 0) {
      setEnd(true);
      return;
    }

    setData((currentData) => {
      const itemIdSet = new Set(currentData.map((d) => d._id));

      const reduplicatedNewData = newData.filter((d) => {
        return !itemIdSet.has(d._id);
      });

      return [...currentData, ...reduplicatedNewData];
    });
  }, [newData]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (!changeLastItemCreateTime) {
        return;
      }

      if (observer.current) observer.current?.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const currentCreateTime = data[data.length - 1]?.createTime;

          if (currentCreateTime) {
            changeLastItemCreateTime(currentCreateTime);
          }
        }
      });

      if (node) observer.current?.observe(node);
    },
    [changeLastItemCreateTime, data]
  );

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <ul>
        {data?.map((item, index) => {
          const date = item?.updateTime ? new Date(item.updateTime) : undefined;
          const timeAgo = getTimeAgo(date);

          return (
            <li
              key={item?._id}
              ref={data.length === index + 1 ? lastPostElementRef : null}
            >
              <Card
                sx={{
                  mb: 2,
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt={item?.creator?.name}
                      src={getAvatarUrl(item?.creator?.avatarImg)}
                    />
                  }
                  action={
                    <IconButton
                      aria-label="settings"
                      onClick={() => {
                        setCurrentData(item);
                        setShowingDrawer(true);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={item?.creator?.name}
                  subheader={
                    <div>
                      <Tooltip title={getFormatedTime(date)}>
                        <span>{timeAgo}</span>
                      </Tooltip>
                    </div>
                  }
                />
                <CardContent>
                  <PostContents contents={item.contents}></PostContents>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
      {isLoading && <div>loading...</div>}
      {error && <div>failed to load</div>}
      {end && <div>no more data</div>}

      <ActionsDrawer
        open={showingDrawer}
        data={currentData}
        onClose={() => {
          setCurrentData(null);
          setShowingDrawer(false);
        }}
      ></ActionsDrawer>
    </Box>
  );
}
