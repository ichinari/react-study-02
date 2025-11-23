import { createApiClient } from "./index";

export interface PromptSongsResponse {
  id: string;
  title?: string;
  duration?: number;
  music_file_path?: string;
  wave_form_file_path?: string;
  created_at?: string;
  bpm?: number;
  key?: {
    id?: number;
    name?: string;
    active?: boolean;
  };
  [key: string]: unknown;
}

const apiClient = createApiClient("https://soundtracks.loudly.com/api", {
  "API-KEY": import.meta.env.VITE_LOUDLY_API_KEY,
});

export const promptSongs = async (
  title: string,
  genre: string,
  description: string,
  duration: number = 30
): Promise<PromptSongsResponse> => {
  const formData = new FormData();
  formData.append(
    "prompt",
    `Create a ${genre} song titled '${title}'. Music style: ${description}. High quality production with clear melody and rhythm.`
  );
  formData.append("duration", duration.toString());

  try {
    const response = await apiClient
      .post("ai/prompt/songs", {
        body: formData,
      })
      .json();

    return response as PromptSongsResponse;
  } catch (error) {
    console.error("[promptSongs] エラー:", error);
    throw error;
  }
};
