import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
  images: initialImages,
  onChange,
  showingDelete = false,
}: {
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
  showingDelete?: boolean;
}) {
  const imagesRef = useRef<ImageItem[]>(initialImages);

  // Sync ref with prop changes
  useEffect(() => {
    imagesRef.current = initialImages;
  }, [initialImages]);

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
        const imageIndex = imagesRef.current.findIndex((d) => d.key === key);
        if (imageIndex !== -1) {
          imagesRef.current[imageIndex] = {
            ...imagesRef.current[imageIndex],
            img,
            uploading: false,
          };
          onChange([...imagesRef.current]);
        }
      } catch (error) {
        // Update error state in ref
        const imageIndex = imagesRef.current.findIndex((d) => d.key === key);
        if (imageIndex !== -1) {
          imagesRef.current[imageIndex] = {
            ...imagesRef.current[imageIndex],
            error: error as Error,
            uploading: false,
          };
          onChange([...imagesRef.current]);
        }
      }
    });

    await Promise.all(uploadPromises);
  };

  return (
    <>
      <PostImageList
        images={imagesRef.current}
        onChange={(newImages) => {
          imagesRef.current = newImages;
          onChange(newImages);
        }}
        showingDelete={showingDelete}
      />
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
      </Button>
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
