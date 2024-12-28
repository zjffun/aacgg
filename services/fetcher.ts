import getApiOrigin from "../utils/getApiOrigin";

const fetcher = async (path: string) => {
  const url = new URL(path, getApiOrigin());

  const response = await fetch(url, {
    mode: "cors",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  return result;
};

export default fetcher;
