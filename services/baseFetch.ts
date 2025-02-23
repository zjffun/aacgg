/* eslint-disable @typescript-eslint/no-explicit-any */
import captureException from "@/utils/captureException";
import getApiOrigin from "@/utils/getApiOrigin";

function getFetchJson(init: RequestInit) {
  async function fetchJson<Req, Res>(path: string, data?: Req) {
    try {
      const url = new URL(path, getApiOrigin());

      const response = await fetch(url, {
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        ...init,
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        let message = "";

        try {
          const result = await response.json();
          message = String(result?.message);
        } catch (error) {
          console.error(error);
          message = "Unknown Error";
        }

        throw new Error(`HTTP ${response.status}: ${message}`);
      }

      return response.json() as Res;
    } catch (error) {
      captureException(error);
      throw error;
    }
  }

  return fetchJson;
}

async function poster<Res, Req = any>(path: string, data: Req) {
  const fetchJson = getFetchJson({
    method: "POST",
  });
  const result = await fetchJson<Req, Res>(path, data);
  return result;
}

async function puter<Res, Req = any>(path: string, data: Req) {
  const fetchJson = getFetchJson({
    method: "PUT",
  });
  const result = await fetchJson<Req, Res>(path, data);
  return result;
}

async function deleter<Res, Req = any>(path: string, data: Req) {
  const fetchJson = getFetchJson({
    method: "DELETE",
  });
  const result = await fetchJson<Req, Res>(path, data);
  return result;
}

export { getFetchJson, poster, puter, deleter };
