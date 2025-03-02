"use client";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  IconButton,
  InputBase,
  Paper,
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
  searchValue,
  onSearch,
  changeLastItemCreateTime,
}: {
  error?: Error;
  isLoading?: boolean;
  newData?: IPost[];
  searchValue?: string;
  onSearch?: (value: string) => void;
  changeLastItemCreateTime?: (time: string) => void;
}) {
  const [data, setData] = useState<IPost[]>([]);
  const [end, setEnd] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [showingDrawer, setShowingDrawer] = useState(false);
  const [currentData, setCurrentData] = useState<IPost | null>(null);

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    setData([]);
    setEnd(false);
  }, [searchValue]);

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
    [changeLastItemCreateTime, data],
  );

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Paper
        sx={{
          p: "2px 4px",
          mb: 1,
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <InputBase
          value={inputSearchValue}
          onChange={(event) => {
            setInputSearchValue(event.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              onSearch?.(inputSearchValue);
            }
          }}
          onBlur={() => {
            onSearch?.(inputSearchValue);
          }}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search " }}
        />
        <IconButton
          onClick={() => {
            onSearch?.(inputSearchValue);
          }}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>

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
          setShowingDrawer(false);
          setCurrentData(null);
        }}
        onDelete={() => {
          const newData = data.filter((d) => {
            return d._id !== currentData?._id;
          });

          setData(newData);
          setShowingDrawer(false);
          setCurrentData(null);
        }}
      ></ActionsDrawer>
    </Box>
  );
}
