"use client";

import { useRouter as useNestRouter } from "next/navigation";
import { useCallback } from "react";
import useSessionStorageState from "use-session-storage-state";

const max = 100;

const useRouter = () => {
  const router = useNestRouter();

  const [history, setHistory] = useSessionStorageState<string[]>(
    "router-history",
    {
      defaultValue: [],
    },
  );

  const push = useCallback(
    (path: string, params?: Record<string, string>) => {
      setHistory([location.href, ...history].slice(0, max));

      let href = path;

      if (params) {
        const searchParams = new URLSearchParams(params);
        href = `${href}?${searchParams}`;
      }

      router.push(href);
    },
    [router, history, setHistory],
  );

  const back = useCallback(() => {
    if (history.length) {
      setHistory(history.slice(1, max));
      router.back();
    } else {
      push("/");
    }
  }, [router, push, history, setHistory]);

  return { push, back };
};

export { useRouter };
