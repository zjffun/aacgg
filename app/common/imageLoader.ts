import getImageUrl from "./getImageUrl";

const imageLoader = ({
  img,
  size,
  file,
}: {
  img?: string;
  size: number;
  file?: File;
}) => {
  if (img) {
    return `https://aacgg.com/cdn-cgi/image/width=${size},height=${size},fix=crop,format=auto,quality=75/${getImageUrl(
      img
    )}`;
  }

  if (file) {
    // TODO: revokeObjectURL
    return URL.createObjectURL(file);
  }

  return "";
};

export default imageLoader;
