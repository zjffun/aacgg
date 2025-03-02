import fetcher from "@/services/fetcher";
import useSWR from "swr";

function getKey(path: string, params?: Record<string, string>) {
  if (!params) {
    return path;
  }

  const urlSearchParams = new URLSearchParams(params);
  return `${path}?${urlSearchParams.toString()}`;
}

export default function useSWRFetcher<T>(
  path: string,
  params?: Record<string, string>,
) {
  const key = getKey(path, params);

  const { data, error, isLoading, mutate } = useSWR<T>(key, fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
}
