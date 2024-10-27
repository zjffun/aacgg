import fetcher from "@/services/fetcher";
import useSWR from "swr";

export interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

function useUser() {
  const { data, error, isLoading } = useSWR(`/api/v1/current-user`, fetcher);

  return {
    user: data as User,
    isLoading,
    isError: error,
  };
}

export default useUser;
