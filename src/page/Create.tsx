import { useState } from "react";
import { promptSongs } from "@api/prompt-songs";
import type { PromptSongsResponse } from "@api/prompt-songs";

function Create() {
  const [musicTitle, setMusicTitle] = useState("");
  const [musicGenre, setMusicGenre] = useState("");
  const [musicDescription, setMusicDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [generatedMusic, setGeneratedMusic] =
    useState<PromptSongsResponse | null>(null);

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

      console.log("音楽生成成功:", response);

      setSuccessMessage("音楽が正常に生成されました");
      setGeneratedMusic(response);
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
    </div>
  );
}

export default Create;
