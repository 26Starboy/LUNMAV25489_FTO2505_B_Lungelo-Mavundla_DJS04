export default function SortDropdown({ sortBy, setSortBy }) {
  return (
    <div style={{ padding: "0 1rem 1rem 1rem" }}>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{ padding: "0.5rem", borderRadius: 6 }}
        aria-label="Sort podcasts"
      >
        <option value="">Sort</option>
        <option value="updated_desc">Newest First</option>
        <option value="title_asc">Title A–Z</option>
        <option value="title_desc">Title Z–A</option>
      </select>
    </div>
  );
}
