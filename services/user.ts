import { captureException } from "@sentry/nextjs";
import { showToast } from "@/app/components/Toast";
import puter from "./puter";

export async function updateUserInfo(data) {
  try {
    const result = await puter("/api/user", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("Update user info failed.");
    return false;
  }
}
