import { showToast } from "@/app/components/Toast";
import captureException from "@/utils/captureException";
import poster from "./poster";
import puter from "./puter";

export async function createRecommend(data) {
  try {
    const result = await poster("/api/recommend", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("创建失败");
    return false;
  }
}

export async function updateRecommend(data) {
  try {
    const result = await puter("/api/recommend", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("修改失败");
    return false;
  }
}
