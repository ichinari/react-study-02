import { useNavigation } from "@hooks/useNavigation";

function App() {
  // sample list data
  const musicList = [
    {
      id: 1,
      title: "Synthwave Dreams",
      artist: "AI Composer",
      audioUrl:
        "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
      coverUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "Jazz Fusion",
      artist: "Neural Network",
      audioUrl:
        "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
      coverUrl:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "Ambient Spaces",
      artist: "Deep Learning",
      audioUrl:
        "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
      coverUrl:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop&crop=center",
    },
  ];

  const dammyImageUrl = "https://placehold.jp/3d4070/ffffff/150x150.png?text=";
  const navigate = useNavigation();

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
                <source src={music.audioUrl} type="audio/mpeg" />
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

export default App;
