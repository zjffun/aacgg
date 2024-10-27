import getApiOrigin from "../utils/getApiOrigin";

const fetcher = (path: string) => {
  const url = new URL(path, getApiOrigin());

  return fetch(url, {
    mode: "cors",
    credentials: "include",
  }).then((res) => {
    return res.json();
  });
};

export default fetcher;
