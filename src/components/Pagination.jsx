export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination" role="navigation" aria-label="Pagination">
      <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>Prev</button>
      {pages.map((p) => (
        <button
          key={p}
          className={p === currentPage ? "active" : ""}
          onClick={() => onPageChange(p)}
          aria-current={p === currentPage ? "page" : undefined}
        >{p}</button>
      ))}
      <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
}
