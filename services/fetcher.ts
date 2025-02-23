import { getFetchJson } from "./baseFetch";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher = async <Res>(path: string) => {
  const fetchJson = getFetchJson({
    method: "GET",
  });

  const result = await fetchJson<never, Res>(path);

  return result;
};

export default fetcher;
