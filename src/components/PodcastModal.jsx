import { genres } from "../data/genres";

export default function PodcastModal({ podcast, onClose }) {
  if (!podcast) return null;
  const genreTitles = (podcast.genreTitles || []).length ? podcast.genreTitles : [];
  const image = podcast.image || podcast.thumbnail || podcast.artwork || "https://via.placeholder.com/600x400?text=No+Image";
  const rawDate = podcast.updated || podcast.lastUpdated || podcast.published || "";
  const updated = rawDate && !Number.isNaN(new Date(rawDate).getTime())
    ? new Date(rawDate).toLocaleDateString()
    : "N/A";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close">✖</button>
        <h2>{podcast.title}</h2>
        <img src={image} alt={podcast.title} style={{ width: "100%", borderRadius: 6 }} />
        <p style={{ color: "var(--grey-text)" }}>{podcast.description || "No description available."}</p>
        <div style={{ marginTop: 8 }}>
          {genreTitles.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
        <p className="updated-text" style={{ marginTop: 12 }}><strong>Last updated:</strong> {updated}</p>
      </div>
    </div>
  );
}
