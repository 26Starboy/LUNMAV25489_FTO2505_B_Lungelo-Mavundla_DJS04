import PodcastCard from "./PodcastCard";

export default function PodcastList({ podcasts, onCardClick }) {
  if (!podcasts || podcasts.length === 0) {
    return <div className="message-container"><p>No podcasts found.</p></div>;
  }
  return (
    <section className="grid">
      {podcasts.map((p) => (
        <PodcastCard key={p.id} podcast={p} onClick={onCardClick} />
      ))}
    </section>
  );
}
