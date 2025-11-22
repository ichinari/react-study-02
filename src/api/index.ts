import ky from "ky";

export const createApiClient = (
  prefixUrl: string,
  headers: Record<string, string>
) => {
  return ky.create({
    prefixUrl,
    headers: {
      Accept: "application/json",
      ...headers,
    },
  });
};
