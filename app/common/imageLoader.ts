const imageLoader = ({ src, size }: { src: string; size: number }) => {
  return `https://aacgg.com/cdn-cgi/image/width=${size},height=${size},fix=crop,format=auto,quality=75/https://r2.aacgg.com/${src}`;
};

export default imageLoader;
