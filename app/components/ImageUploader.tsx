import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import uploadImages from "@/services/uploadImages";
import PostImageList from "./PostImageList";
import { ImageItem } from "../types";
import { useRef, useEffect } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ImageUploader({
  images,
  onChange,
  showingDelete = false,
}: {
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
  showingDelete?: boolean;
}) {
  const imagesRef = useRef<ImageItem[]>(images);

  // Sync ref with prop changes
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files?.length) return;

    const files = [...event.target.files];
    const newImageKeys = files.map(() => crypto.randomUUID());

    // Add new images to ref with uploading status
    imagesRef.current = [
      ...imagesRef.current,
      ...files.map((file, index) => ({
        key: newImageKeys[index],
        file,
        uploading: true,
      })),
    ];
    onChange(imagesRef.current);

    // Upload files in parallel
    const uploadPromises = files.map(async (file, index) => {
      const key = newImageKeys[index];
      try {
        const [img] = await uploadImages([file]);

        // Find and update the specific image in ref
        const newImages = imagesRef.current.map((d) => {
          if (d.key === key) {
            return {
              ...d,
              img,
              uploading: false,
            };
          }
          return d;
        });

        onChange(newImages);
      } catch (error) {
        // Update error state in ref
        const newImages = imagesRef.current.map((d) => {
          if (d.key === key) {
            return {
              ...d,
              error: error as Error,
              uploading: false,
            };
          }
          return d;
        });

        onChange(newImages);
      }
    });

    await Promise.all(uploadPromises);
  };

  return (
    <>
      <PostImageList
        images={images}
        onChange={(newImages) => {
          onChange(newImages);
        }}
        showingDelete={showingDelete}
        lastElement={
          <Button
            sx={{
              aspectRatio: "1 / 1",
              width: "100%",
            }}
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
          >
            <AddPhotoAlternateIcon />
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              multiple
            />
          </Button>
        }
      />
    </>
  );
}

export function SingleImageUploader({
  image,
  onChange,
  showingDelete = false,
}: {
  image?: ImageItem;
  onChange: (image: ImageItem | undefined) => void;
  showingDelete?: boolean;
}) {
  const handleImageChange = (images: ImageItem[]) => {
    onChange(images[0]);
  };

  return (
    <ImageUploader
      images={image ? [image] : []}
      onChange={handleImageChange}
      showingDelete={showingDelete}
    />
  );
}
