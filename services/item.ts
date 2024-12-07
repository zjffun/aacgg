import { showToast } from "@/app/components/Toast";
import captureException from "@/utils/captureException";
import poster from "./poster";

export async function createItem(data) {
  try {
    const result = await poster("/api/item", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("创建失败");
    return false;
  }
}

export async function addTrackItem(data) {
  try {
    const result = await poster("/api/track-item", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("添加失败");
    return false;
  }
}
