import { captureException } from "@sentry/nextjs";
import { showToast } from "@/app/components/Toast";
import { poster, puter } from "./baseFetch";

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

export async function signOut() {
  try {
    const result = await poster("/api/user/sign-out", {});

    return result;
  } catch (error) {
    captureException(error);
    showToast("Sign out failed");
    return false;
  }
}
