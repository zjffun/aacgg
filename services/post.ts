import { showToast } from "@/app/components/Toast";
import captureException from "@/utils/captureException";
import { poster, puter, deleter } from "./baseFetch";

let homePostsKey = 0;

export function getPostsRefreshKey() {
  return String(homePostsKey);
}

export function increasePostsKey() {
  homePostsKey++;
}

export async function createPost(data) {
  try {
    const result = await poster("/api/post", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("Publish Failed");
    return false;
  }
}

export async function updatePost(data) {
  try {
    const result = await puter("/api/post", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("Edit Failed");
    return false;
  }
}

export async function deletePost(id) {
  try {
    const result = await deleter(`/api/post/${id}`, {});

    return result;
  } catch (error) {
    captureException(error);
    showToast("Delete Failed");
    return false;
  }
}
