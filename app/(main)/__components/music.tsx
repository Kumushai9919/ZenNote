"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  IoPlaySkipForward,
  IoPlaySkipBack,
  IoShuffle,
  IoResize,
} from "react-icons/io5";

// ✅ Get access token from API route
const getAccessToken = async () => {
  try {
    const response = await axios.post("/api/spotifyapi");
    return response.data.access_token;
  } catch (error) {
    console.error("Access token error:", error);
    return null;
  }
};

// ✅ Get playlists
const getStudyPlaylists = async (token: string) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      params: { q: "study lofi", type: "playlist", limit: 5 },
      headers: { Authorization: `Bearer ${token}` },
    });

    return (
      response.data?.playlists?.items?.filter(
        (playlist: any) => playlist && playlist.id && playlist.name
      ) || []
    );
  } catch (error) {
    console.error("Playlist fetch error:", error);
    return [];
  }
};

const Music = () => {
  const [token, setToken] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [sidebarSmall, setSidebarSmall] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const accessToken = await getAccessToken();
        if (!accessToken) throw new Error("Failed to get access token.");

        setToken(accessToken);
        const fetchedPlaylists = await getStudyPlaylists(accessToken);

        if (fetchedPlaylists.length > 0) {
          setPlaylists(fetchedPlaylists);
          setSelectedPlaylist(fetchedPlaylists[0]); // ✅ Default to first playlist
        }
      } catch (err: any) {
        console.error("Failed to fetch playlists:", err);
        setError("Failed to load Spotify music. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  // ✅ Detect Sidebar Size and Show Hint if Too Small
  useEffect(() => {
    const handleResize = () => {
      setSidebarSmall(window.innerWidth < 300); // Adjust based on your layout
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextPlaylist = () => {
    const nextIndex = (currentPlaylistIndex + 1) % playlists.length;
    setCurrentPlaylistIndex(nextIndex);
    setSelectedPlaylist(playlists[nextIndex]);
  };

  const previousPlaylist = () => {
    const prevIndex =
      (currentPlaylistIndex - 1 + playlists.length) % playlists.length;
    setCurrentPlaylistIndex(prevIndex);
    setSelectedPlaylist(playlists[prevIndex]);
  };

  const shufflePlaylist = () => {
    const randomIndex = Math.floor(Math.random() * playlists.length);
    setCurrentPlaylistIndex(randomIndex);
    setSelectedPlaylist(playlists[randomIndex]);
  };

  if (loading) {
    return (
      <div className="p-4 bg-neutral-800 rounded-md text-white">
        Loading playlists...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-neutral-800 rounded-md text-white">{error}</div>
    );
  }

  return (
    <div className="p-4 bg-neutral-800 rounded-md">
      <h3 className="text-md font-semibold text-white">Spotify Music</h3>

      <div className="flex flex-col items-center gap-4 mb-2 w-full">
        {/* ✅ Playlist Dropdown */}
        <select
          value={selectedPlaylist?.id || ""}
          onChange={(e) => {
            const playlist = playlists.find((p) => p.id === e.target.value);
            const index = playlists.findIndex((p) => p.id === e.target.value);
            setSelectedPlaylist(playlist);
            setCurrentPlaylistIndex(index);
            setIframeLoading(true); // Set iframe loading state to true when changing playlist
          }}
          className=" w-full sm:w-auto bg-white/10 text-white rounded px-2 py-1 max-w-[200px] overflow-visible mt-2"
        >
          <option value="">Select a playlist</option>
          {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </select>

        {/* ✅ Buttons */}
        <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-start">
          <button
            onClick={previousPlaylist}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
            title="Previous playlist"
          >
            <IoPlaySkipBack size={20} />
          </button>
          <button
            onClick={shufflePlaylist}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
            title="Shuffle playlists"
          >
            <IoShuffle size={20} />
          </button>
          <button
            onClick={nextPlaylist}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
            title="Next playlist"
          >
            <IoPlaySkipForward size={20} />
          </button>
        </div>
      </div>

      {/* ✅ Spotify iFrame */}
      {selectedPlaylist && (
        <div className="relative w-full">
          {iframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 rounded-xl">
              <div className="text-white">Loading player...</div>
            </div>
          )}
          <iframe
            src={`https://open.spotify.com/embed/playlist/${selectedPlaylist.id}?utm_source=generator&theme=0`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className={`rounded-xl ${
              iframeLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIframeLoading(false)} // Set iframe loading state to false when iframe is loaded
          />
        </div>
      )}
      <div className="flex items-center gap-2 text-[#B03052] text-sm mt-3">
        <IoResize className="w-5 h-5" />
        <span>Expand the sidebar to view full player</span>
      </div>
    </div>
  );
};

export default Music;
