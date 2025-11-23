import { useEffect, useState } from "react";
import { getMusic } from "@api/supabase/music";
import type { MusicColums } from "@api/supabase/types";
import { useNavigation } from "@hooks/useNavigation";

function List() {
  const dammyImageUrl = "https://placehold.jp/3d4070/ffffff/150x150.png?text=";
  const navigate = useNavigation();
  const [musicList, setMusicList] = useState<MusicColums[]>([]);

  useEffect(() => {
    const fetchMusic = async () => {
      const musicList = await getMusic();
      setMusicList(musicList);
    };
    fetchMusic();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Music List</h1>
      <section className="mb-8">
        <div className="flex items-start gap-x-5">
          <h2 className="text-xl font-bold mb-4">Created Music</h2>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => navigate("create")}
          >
            Create New Music
          </button>
        </div>

        <div className="flex gap-4">
          {musicList.map((music) => (
            <div
              key={music.id}
              className="border p-4 rounded flex flex-col items-center gap-y-5"
            >
              <img
                src={dammyImageUrl + music.title}
                alt={music.title}
                width={150}
                height={150}
                className="rounded"
              />

              <h3 className="font-bold">{music.title}</h3>

              <audio controls>
                <source src={music.music_file_path} type="audio/mpeg" />
              </audio>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Recommended Music</h2>
      </section>
    </div>
  );
}

export default List;
