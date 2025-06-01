"use client";

import { showConfirm } from "@/app/components/Confirm";
import ImageUploader from "@/app/components/ImageUploader";
import { useRouter } from "@/hooks/useNavRouter";
import { createPost, increasePostsKey, updatePost } from "@/services/post";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { Stack, styled, Switch, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import pick from "lodash-es/pick";
import { useEffect, useMemo, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { ContentType, ImageItem, IPost } from "../../types";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  
    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  `,
);

function getInitData(data?: IPost) {
  let text = "";
  const images: ImageItem[] = [];
  if (data) {
    for (const content of data.contents) {
      if (content.type === ContentType.TEXT) {
        text += content.content;
      } else if (content.type === ContentType.IMAGE) {
        images.push({
          key: content.content,
          img: content.content,
        });
      }
    }
  }
  return {
    id: data?._id,
    text,
    images,
    isPublic: data?.isPublic === true,
  };
}

export default function PostForm({ data }: { data?: IPost }) {
  const router = useRouter();

  const initData = getInitData(data);
  const isEdit = initData.id;

  const [text, setText] = useState(initData.text);
  const [images, setImages] = useState<ImageItem[]>(initData.images);
  const [isPublic, setIsPublic] = useState<boolean>(initData.isPublic);

  const [draftPost, setDraftPost] = useLocalStorageState<{
    text?: string;
    images?: ImageItem[];
  }>("draftPost", {
    defaultValue: {
      text: "",
      images: [],
    },
  });

  useEffect(() => {
    if (!isEdit && (draftPost?.text || draftPost?.images?.length)) {
      (async function () {
        try {
          await showConfirm({
            content: "You have a draft before. Do you want to using draft?",
          });
          setText(draftPost?.text || "");
          setImages(draftPost?.images || []);
        } catch {
          setDraftPost({});
        }
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = useMemo(() => {
    const uploading = images.some((img) => {
      return img.uploading;
    });

    if (uploading) {
      return {
        message: "Waiting for images upload",
      };
    }

    return;
  }, [images]);

  async function submit() {
    const contents = [
      {
        type: ContentType.TEXT,
        content: text,
      },
      ...images
        .filter((img) => img.img)
        .map((img) => {
          return {
            type: ContentType.IMAGE,
            content: img.img,
          };
        }),
    ];

    let result;

    const postCommonData = {
      contents,
      isPublic,
    };

    if (isEdit) {
      result = await updatePost({
        id: initData.id,
        ...postCommonData,
      });
    } else {
      result = await createPost({
        ...postCommonData,
      });
    }

    if (!result) {
      return;
    }

    increasePostsKey();
    setDraftPost({});
    router.push("/you/post");
  }

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { width: "100%" }, padding: 2 }}
      noValidate
      autoComplete="off"
    >
      <Stack spacing={2}>
        <TextareaAutosize
          minRows={6}
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setDraftPost((draft) => {
              return {
                ...draft,
                text: event.target.value,
              };
            });
          }}
        ></TextareaAutosize>
        <ImageUploader
          images={images}
          onChange={(images) => {
            setImages(images);
            setDraftPost((draft) => {
              return {
                ...draft,
                images: images
                  .filter((d) => d.img)
                  .map((d) => pick(d, ["key", "img"])),
              };
            });
          }}
          showingDelete={true}
        />

        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography>Private</Typography>
          <Switch
            checked={isPublic}
            onChange={(event) => {
              setIsPublic(Boolean(event?.target?.checked));
            }}
          />
          <Typography>Public</Typography>
        </Stack>

        <Button
          disabled={Boolean(loading)}
          sx={{ w: "100%" }}
          variant="contained"
          onClick={submit}
        >
          Post
        </Button>
        <Typography variant="body2">{loading?.message}</Typography>
      </Stack>
    </Box>
  );
}
