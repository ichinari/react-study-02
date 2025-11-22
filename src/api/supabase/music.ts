import { supabaseClient } from "../index";
import type { MusicColums, MusicTable } from "./types";

const musicTableApi = supabaseClient<MusicTable>();

export const getMusic = async () => {
  const { data, error } = await musicTableApi.from("Music_001").select("*");
  if (error) throw error;
  return data;
};

export const insertMusic = async (params: MusicColums) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { created_date, ...music } = params;
  const { data, error } = await musicTableApi
    .from("Music_001")
    .insert<MusicColums>(music)
    .select("*");
  if (error) throw error;
  return data;
};

export const updateMusic = async (params: MusicColums) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, created_date, ...music } = params;
  music.updated_date = new Date().toString();

  const { data, error } = await musicTableApi
    .from("Music_001")
    .update<MusicColums>(music)
    .eq("id", id)
    .select("*");
  if (error) throw error;
  return data;
};

export const deleteMusic = async (params: { id: string }) => {
  const { data, error } = await musicTableApi
    .from("Music_001")
    .delete()
    .eq("id", params.id)
    .select("*");
  if (error) throw error;
  return data;
};
