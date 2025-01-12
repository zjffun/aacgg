import { showToast } from "@/app/components/Toast";
import captureException from "@/utils/captureException";
import poster from "./poster";

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
    showToast("发布失败");
    return false;
  }
}
