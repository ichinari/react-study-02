import { useState } from "react";

function Create() {
  const [musicTitle, setMusicTitle] = useState("");
  const [musicGenre, setMusicGenre] = useState("");
  const [musicDescription, setMusicDescription] = useState("");

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

  const handleCreateMusic = () => {
    console.log("Create Music function called");
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
      <button onClick={handleCreateMusic}>Create Music</button>
    </div>
  );
}

export default Create;
