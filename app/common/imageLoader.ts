import getImageUrl from "./getImageUrl";

const imageLoader = ({
  img,
  size,
  file,
  usingOriginalUrl,
}: {
  img?: string;
  size?: number;
  file?: File;
  usingOriginalUrl?: boolean;
}) => {
  if (img) {
    const originalUrl = getImageUrl(img);

    if (usingOriginalUrl) {
      return originalUrl;
    }

    return `https://aacgg.com/cdn-cgi/image/width=${size},fix=crop,format=auto,quality=75/${originalUrl}`;
  }

  if (file) {
    // TODO: revokeObjectURL
    return URL.createObjectURL(file);
  }

  return "";
};

export default imageLoader;
