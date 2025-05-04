export function isValidUrl(url) {
  try {
    const urlInstance = new URL(url);

    if (!urlInstance?.host) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
