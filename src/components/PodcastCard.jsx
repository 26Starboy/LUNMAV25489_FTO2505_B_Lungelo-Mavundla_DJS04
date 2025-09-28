export default function PodcastCard({ podcast, onClick }) {
  if (!podcast) return null;
  const id = String(podcast.id ?? podcast.showId ?? podcast._id ?? "");
  const image =
    podcast.image || podcast.thumbnail || podcast.artwork || "https://via.placeholder.com/600x400?text=No+Image";
  const rawDate = podcast.updated || podcast.lastUpdated || podcast.latestRelease || podcast.publishedAt || podcast.published || "";
  const formattedDate = rawDate && !Number.isNaN(new Date(rawDate).getTime())
    ? new Date(rawDate).toLocaleDateString()
    : "N/A";

  return (
    <article className="card" onClick={() => onClick && onClick(podcast)}>
      <img src={image} alt={podcast.title || "Podcast cover"} />
      <h3>{podcast.title || "Untitled Podcast"}</h3>
      <div className="tags">
        {podcast.genres?.map((g) => (
          <span key={`${id}-${g}`} className="tag">{g}</span>
        ))}
      </div>
      <p className="updated-text">Updated: {formattedDate}</p>
    </article>
  );
}
