import fetcher from "@/services/fetcher";
import useSWR from "swr";

export default function useSWRFetcher<T>(key: string) {
  const { data, error, isLoading } = useSWR<T>(key, fetcher);

  return {
    data,
    isLoading,
    error,
  };
}
