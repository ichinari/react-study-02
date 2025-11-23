import { useState } from "react";
import { promptSongs } from "@api/prompt-songs";
import { insertMusic } from "@api/supabase/music";

import type { PromptSongsResponse } from "@api/prompt-songs";
import type { MusicColums } from "@api/supabase/types";

function Create() {
  const [musicTitle, setMusicTitle] = useState("");
  const [musicGenre, setMusicGenre] = useState("");
  const [musicDescription, setMusicDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [generatedMusic, setGeneratedMusic] =
    useState<PromptSongsResponse | null>(null);
  const [isSaved, setIsSaved] = useState(true);

  const handleMusicTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMusicTitle(e.target.value);
  };

  const handleMusicGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMusicGenre(e.target.value);
  };

  const handleMusicDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMusicDescription(e.target.value);
  };

  const handleCreateMusic = async () => {
    // 入力値の検証
    if (!musicTitle.trim() || !musicGenre || !musicDescription.trim())
      return setError("すべての項目を入力してください");

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await promptSongs(
        musicTitle,
        musicGenre,
        musicDescription
      );
      setSuccessMessage("音楽が正常に生成されました");
      setGeneratedMusic(response);

      if (!isSaved) setIsSaved(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "エラーが発生しました";
      console.error("API呼び出しエラー:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      resetForm();
    }
  };

  // 入力をリセット
  const resetForm = () => {
    setMusicTitle("");
    setMusicGenre("");
    setMusicDescription("");
    setError(null);
    setSuccessMessage(null);
  };

  // save generated music
  const saveMusic = async () => {
    try {
      const params: MusicColums = {
        id: generatedMusic?.id || "",
        title: generatedMusic?.title || "",
        duration: generatedMusic?.duration || 0,
        music_file_path: generatedMusic?.music_file_path || "",
        wave_form_file_path: generatedMusic?.wave_form_file_path || "",
        music_created_date: generatedMusic?.created_at,
        bpm: generatedMusic?.bpm,
        key_id: generatedMusic?.key?.id || 0,
        key_name: generatedMusic?.key?.name || "",
        key_active: generatedMusic?.key?.active || false,
      };

      await insertMusic(params);
      setSuccessMessage("音楽が保存されました");
      setIsSaved(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "保存エラーが発生しました";
      console.error("保存エラー:", err);
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1>Create Page</h1>
      <div>
        <div>
          <label>Music Title</label>
          <input
            type="text"
            placeholder="Enter music title"
            value={musicTitle}
            onChange={(e) => handleMusicTitleChange(e)}
          />
        </div>
        <div>
          <label>Music Genre</label>
          <select
            value={musicGenre}
            onChange={(e) => handleMusicGenreChange(e)}
          >
            <option value="">select</option>
            <option value="electronic">Electronic</option>
            <option value="jazz">Jazz</option>
            <option value="classic">Classic</option>
            <option value="ambient">Ambient</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
          </select>
        </div>
      </div>
      <div>
        <label>Music Description</label>
        <textarea
          placeholder="Enter music description"
          value={musicDescription}
          onChange={(e) => handleMusicDescriptionChange(e)}
          rows={4}
        />
      </div>

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>エラー: {error}</div>
      )}

      {successMessage && (
        <div style={{ color: "green", marginTop: "10px" }}>
          {successMessage}
        </div>
      )}

      <button
        onClick={handleCreateMusic}
        disabled={isLoading}
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
      >
        {isLoading ? "生成中..." : "Create Music"}
      </button>

      {generatedMusic && (
        <div>
          <div>
            <h3>Generated Music</h3>
            <audio controls>
              <source src={generatedMusic.music_file_path} type="audio/mpeg" />
            </audio>
          </div>

          {/* save button */}
          {isSaved && (
            <div>
              <button
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                onClick={saveMusic}
              >
                Save Music
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Create;
