const getImageUrl = (img) => {
  if (!img) {
    return "";
  }

  return `https://r2.aacgg.com/${img}`;
};

export default getImageUrl;
