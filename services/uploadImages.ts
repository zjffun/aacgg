import fetcher from "./fetcher";

export default async function uploadImages(files: File[]): Promise<string[]> {
  const results: string[] = [];
  for (const file of files) {
    const { url, key } = await fetcher<{ url: string; key: string }>(
      "/api/common/upload-presigned-url",
    );

    if (!url) {
      console.error("get url failed");
      return results;
    }

    const uploadRes = await fetch(url, {
      mode: "cors",
      method: "PUT",
      body: file,
    });

    if (uploadRes.ok) {
      results.push(key);
    } else {
      console.error("upload failed");
    }
  }

  return results;
}
