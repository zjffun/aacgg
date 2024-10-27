export default function getApiOrigin() {
  if (process.env.NODE_ENV === "development") {
    return "https://dev-api.aacgg.com";
  } else {
    return "https://api.aacgg.com";
  }
}
