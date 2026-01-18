import { wait } from "@/lib/utils";

type MethodType = "GET" | "POST" | "PUT" | "DELETE";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:1337";

export async function makeRequest(
  method: MethodType,
  url: string,
  payload: Object | undefined = undefined,
  options: {
    consoleMsg?: string;
    ensureArray?: boolean;
    waitTime?: number;
    rawResponse?: boolean;
  } = {},
) {
  const requestOptions: RequestInit = {
    method,
    credentials: "include",
  };

  if (method !== "GET" && payload && Object.keys(payload).length > 0) {
    requestOptions.headers = { "Content-Type": "application/json" };
    requestOptions.body = JSON.stringify(payload);
  }

  const res = await fetch(`${BASE_URL}/api/${url}`, requestOptions);
  if (!res.ok) throw new Error((await res.json()).error);

  const response = await res.json();
  const data = response.data;
  if (options.consoleMsg) console.log(`${options.consoleMsg}: `, data);

  if (options.ensureArray && !Array.isArray(data)) {
    console.warn(`${method} ${url} response must be an Array!`);
    return [];
  }

  if (options.waitTime) await wait(options.waitTime);

  if (options.rawResponse) return response;
  return data;
}
