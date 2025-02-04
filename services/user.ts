import { captureException } from "@sentry/nextjs";
import { showToast } from "@/app/components/Toast";
import puter from "./puter";
import poster from "./poster";

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

export async function createUser(data) {
  try {
    const result = await poster("/api/user", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("Update user info failed.");
    return false;
  }
}

export async function passwordLogin(data) {
  try {
    const result = await poster("/api/user/password-login", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("Login failed");
    return false;
  }
}
