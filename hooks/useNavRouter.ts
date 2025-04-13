"use client";

import { useRouter as useNestRouter } from "next/navigation";
import { useCallback, useRef } from "react";
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
    (href: string) => {
      setHistory([location.href, ...history].slice(0, max));

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

  const navRouter = useRef({
    push,
    back,
  });

  navRouter.current.push = push;
  navRouter.current.back = back;

  return navRouter.current;
};

export { useRouter };
