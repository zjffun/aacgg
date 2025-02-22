import { showToast } from "@/app/components/Toast";
import captureException from "@/utils/captureException";
import poster from "./poster";
import puter from "./puter";

let homePostsKey = 0;

export function getHomePostsRefreshKey() {
  return String(homePostsKey);
}

export function increaseHomePostsKey() {
  homePostsKey++;
}

export async function createPost(data) {
  try {
    const result = await poster("/api/post", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("Publish Error");
    return false;
  }
}

export async function updatePost(data) {
  try {
    const result = await puter("/api/post", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("Edit Error");
    return false;
  }
}
