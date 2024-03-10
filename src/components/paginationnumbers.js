export const PaginationNumbers = (props) => {
  const handleInputChange = (e) => {
    const newPageNumber = parseInt(e.target.value, 10);
    props.onPageNumberChange(newPageNumber);
  };

  const prevVisibility = props.gotoPrevPage ? "visible" : "hidden";
  const nextVisibility = props.gotoNextPage ? "visible" : "hidden";

  return (
    <>
      <button
        className="pagination-button prev material-icons"
        onClick={props.gotoFirstPage}
        style={{ visibility: prevVisibility }}
      >
        keyboard_double_arrow_left
      </button>
      <button
        className="pagination-button prev material-icons"
        onClick={props.gotoPrevPage}
        style={{ visibility: prevVisibility }}
      >
        chevron_left
      </button>

      <input
        type="number"
        min="1"
        max={props.maxPageNumber}
        onChange={handleInputChange}
        value={props.pageNumber}
      />

      <button
        className="pagination-button next material-icons"
        onClick={props.gotoNextPage}
        style={{ visibility: nextVisibility }}
      >
        chevron_right
      </button>
      <button
        className="pagination-button next material-icons"
        onClick={props.gotoLastPage}
        style={{ visibility: nextVisibility }}
      >
        keyboard_double_arrow_right
      </button>
    </>
  );
};
