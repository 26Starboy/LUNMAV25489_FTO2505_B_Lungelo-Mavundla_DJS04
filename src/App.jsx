import { useEffect, useState } from "react";
import { genres } from "../genres.js";
import SearchBar from "./components/SearchBar.jsx";
import FilterControls from "./components/FilterControls.jsx";
import SortControls from "./components/SortControls.jsx";
import PodcastList from "./components/PodcastList.jsx";
import PaginationControls from "./components/PaginationControls.jsx";

const PAGE_SIZE = 12;

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((res) => res.json())
      .then((data) => {
        setPodcasts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch podcasts.");
        setLoading(false);
      });
  }, []);

  // Filter + search + sort
  const filteredPodcasts = podcasts
    .filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((p) => {
      if (!selectedGenre) return true;
      return p.genre.some((id) => id === selectedGenre);
    })
    .sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      } else if (sortOption === "title-asc") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredPodcasts.length / PAGE_SIZE);
  const paginatedPodcasts = filteredPodcasts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div>
      <header className="app-header">
        <h1>🎧 Podcast App</h1>
      </header>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div style={{ display: "flex", gap: "1rem", padding: "0 1rem" }}>
        <FilterControls
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
        <SortControls sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      {loading ? (
        <div className="message-container">
          <div className="spinner"></div>
          <p>Loading podcasts...</p>
        </div>
      ) : error ? (
        <div className="message-container">
          <div className="error">{error}</div>
        </div>
      ) : (
        <>
          <PodcastList podcasts={paginatedPodcasts} genres={genres} />
          <PaginationControls
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}

export default App;
