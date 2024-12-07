import getApiOrigin from "../utils/getApiOrigin";

const fetcher = async (path: string) => {
  const url = new URL(path, getApiOrigin());

  const result = await fetch(url, {
    mode: "cors",
    credentials: "include",
  }).then((res) => {
    return res.json();
  });

  return result;
};

export default fetcher;
