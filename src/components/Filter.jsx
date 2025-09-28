export default function Filter({ genres, selectedGenre, setSelectedGenre }) {
  return (
    <div style={{ padding: "0 1rem 1rem 1rem" }}>
      <select
        value={selectedGenre || ""}
        onChange={(e) =>
          setSelectedGenre(e.target.value ? Number(e.target.value) : "")
        }
        style={{ padding: "0.5rem", borderRadius: 6 }}
        aria-label="Filter by genre"
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>{g.title}</option>
        ))}
      </select>
    </div>
  );
}
