import useSWRFetcher from "@/hooks/useSWRFetcher";
import { useState } from "react";
import { IProgress } from "../types";

function useProgress({ id }: { id?: string | null }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, error, isLoading } = useSWRFetcher<{
    progress: IProgress[];
  }>(`/api/get-item-progress/${id}`, {
    _refresh: String(refreshKey),
  });

  function updateProgress() {
    setRefreshKey(refreshKey + 1);
  }

  return {
    progress: data?.progress,
    updateProgress,
    isLoading,
    error,
  };
}

export default useProgress;
