import getApiOrigin from "@/utils/getApiOrigin";

const poster = async (path: string, data: any) => {
  const url = new URL(path, getApiOrigin());
  
  const response = await fetch(url, {
    mode: "cors",
    credentials: "include",
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default poster;
