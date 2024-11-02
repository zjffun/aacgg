import getApiOrigin from "@/utils/getApiOrigin";

const poster = (path: string, data: any) => {
  const url = new URL(path, getApiOrigin());
  return fetch(url, {
    mode: "cors",
    credentials: "include",
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });
};

export default poster;
