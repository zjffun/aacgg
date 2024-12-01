import { showToast } from "@/app/components/Toast";
import captureException from "@/utils/captureException";
import poster from "./poster";

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
