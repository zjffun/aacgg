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
    return `https://aacgg.com/cdn-cgi/image/width=${size},height=${size},fix=crop,format=auto,quality=75/https://r2.aacgg.com/${img}`;
  }

  if (file) {
    // TODO: revokeObjectURL
    return URL.createObjectURL(file);
  }

  return "";
};

export default imageLoader;
