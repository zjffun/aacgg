import getApiOrigin from "../utils/getApiOrigin";

const fetcher = (path: string) => {
  const url = new URL(path, getApiOrigin());

  const result = fetch(url, {
    mode: "cors",
    credentials: "include",
  }).then((res) => {
    return res.json();
  });

  return result;
};

export default fetcher;
