import ky from "ky";
import { createClient } from "@supabase/supabase-js";

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

export const supabaseClient = <T>() => {
  return createClient<T>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
};
