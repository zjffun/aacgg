import getImageUrl from "./getImageUrl";

const getAvatarUrl = (img) => {
  if (!img) {
    return "/user.png";
  }

  const url = getImageUrl(img);

  return url;
};

export default getAvatarUrl;
