function BookDisplay({ children }) {
  return (
    <>
      <div className="books-overview">
        <div className="header-text mobile-hidden">Stress Less. Read More.</div>
        {children}
      </div>
    </>
  );
}

export default BookDisplay;
