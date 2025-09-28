export default function SearchBar({ query, setQuery }) {
  return (
    <div style={{ padding: "1rem" }}>
      <input
        type="search"
        aria-label="Search podcasts"
        placeholder="Search podcasts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", maxWidth: 480, padding: "0.5rem", borderRadius: 6 }}
      />
    </div>
  );
}
