import getApiOrigin from "./getApiOrigin";

const apiOrigin = getApiOrigin();

const signInUrl = `${apiOrigin}/api/auth/github`;

export default function openGithubSignIn() {
  location.href = signInUrl;
}
