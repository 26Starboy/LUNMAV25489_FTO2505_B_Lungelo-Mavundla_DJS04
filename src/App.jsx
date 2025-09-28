import { useEffect, useState, useCallback } from "react";
import { genres } from "./data/genres";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import SortDropdown from "./components/SortDropdown";
import PodcastList from "./components/PodcastList";
import Pagination from "./components/Pagination";
import PodcastModal from "./components/PodcastModal";
import "./index.css";

/**
 * App - main application component
 * Implements:
 * - Fetching podcast previews from remote API
 * - Search (live), Filter (genre), Sort (newest/title asc/desc), Pagination
 * - Modal details on card click
 *
 * State is centralized in App to ensure synchronization between controls.
 *
 * @returns {JSX.Element}
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(""); // genre id (number) or empty string
  const [sortBy, setSortBy] = useState("updated_desc"); // 'updated_desc' | 'title_asc' | 'title_desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  const ITEMS_PER_PAGE = 8;

  // Fetch podcasts once
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("https://podcast-api.netlify.app/");
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        // defensive: ensure data is array
        setPodcasts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to fetch");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Reset page to 1 whenever filters/search/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedGenre, sortBy]);

  // --- Filtering & Searching ---
  const filtered = podcasts.filter((p) => {
    // title match (substring, case-insensitive)
    const title = String(p.title || "");
    const matchesQuery = title.toLowerCase().includes(String(query).toLowerCase());

    // genre match: podcast may include genre IDs in p.genre or p.genres arrays, or not at all
    if (!selectedGenre) {
      return matchesQuery;
    }

    const pid = String(p.id ?? p._id ?? "");
    // podcasts from this API often expose genres as array of ids in p.genre or p.genres
    const genreIds = p.genres ?? p.genre ?? [];
    const matchesGenre = Array.isArray(genreIds) && genreIds.some((g) => String(g) === String(selectedGenre));

    // Another fallback: map `genres` file shows arrays contain show IDs (strings)
    // If the podcast id appears in a genre.shows, that's also a match
    let matchesGenreByMapping = false;
    if (!matchesGenre) {
      matchesGenreByMapping = genres.some((g) => g.id === Number(selectedGenre) && g.shows.includes(String(p.id)));
    }

    return matchesQuery && (matchesGenre || matchesGenreByMapping);
  });

  // --- Sorting ---
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "title_asc") return String(a.title || "").localeCompare(String(b.title || ""));
    if (sortBy === "title_desc") return String(b.title || "").localeCompare(String(a.title || ""));
    // default: newest first by updated/lastUpdated/created fields
    const aDate = new Date(a.updated || a.lastUpdated || a.published || a.publishedAt || 0);
    const bDate = new Date(b.updated || b.lastUpdated || b.published || b.publishedAt || 0);
    return bDate - aDate;
  });

  // --- Pagination ---
  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = sorted.slice(start, start + ITEMS_PER_PAGE);

  const handlePageChange = useCallback((page) => {
    const pg = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(pg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [totalPages]);

  // --- helper to resolve genre titles for display (map IDs -> titles) ---
  const resolveGenreTitles = useCallback((p) => {
    const ids = p.genres ?? p.genre ?? [];
    const titles = [];
    // first map ids if provided
    if (Array.isArray(ids) && ids.length > 0) {
      ids.forEach((id) => {
        const g = genres.find((x) => String(x.id) === String(id));
        if (g) titles.push(g.title);
      });
    }
    // fallback: check genres mapping where shows includes podcast id
    if (titles.length === 0) {
      const pid = String(p.id ?? p._id ?? "");
      genres.forEach((g) => {
        if (g.shows && g.shows.includes(pid)) titles.push(g.title);
      });
    }
    return titles;
  }, []);

  if (loading) {
    return (
      <div className="message-container">
        <div className="spinner"></div>
        <p>Loading podcasts...</p>
      </div>
    );
  }

  if (error) {
    return <div className="message-container"><div className="error">{error}</div></div>;
  }

  return (
    <main>
      <header className="app-header">
        <div>
          <h1>Podcast Explorer</h1>
        </div>
      </header>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: "0 1rem" }}>
        <div style={{ flex: "1 1 320px", minWidth: 220 }}>
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        <div style={{ minWidth: 180 }}>
          <Filter genres={genres} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
        </div>

        <div style={{ minWidth: 180 }}>
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      {/* Podcast grid (cards click to open modal) */}
      <PodcastList
        podcasts={currentItems}
        onCardClick={(p) => {
          // attach resolved genre titles for modal
          const withGenreTitles = { ...p, genreTitles: resolveGenreTitles(p) };
          setSelectedPodcast(withGenreTitles);
        }}
      />

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      {/* Modal */}
      <PodcastModal podcast={selectedPodcast} onClose={() => setSelectedPodcast(null)} />
    </main>
  );
}
