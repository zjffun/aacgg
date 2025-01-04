import getApiOrigin from "@/utils/getApiOrigin";
import useSWR from "swr";

export interface User {
  login: string,
  name: string;
  email: string;
  avatarUrl: string;
}

const fetcher = async (path: string) => {
  const url = new URL(path, getApiOrigin());

  const response = await fetch(url, {
    mode: "cors",
    credentials: "include",
  });

  const result = await response.json();

  return result;
};

function useUser() {
  const { data, error, isLoading } = useSWR(`/api/v1/current-user`, fetcher);

  return {
    user: data as User,
    isLoading,
    isError: error,
  };
}

export default useUser;
