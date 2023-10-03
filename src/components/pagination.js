export const Pagination = (props) => {
  return (
    <>
      {props.gotoPrevPage && (
        <button
          className="pagination-button prev material-icons"
          onClick={props.gotoPrevPage}
        >
          chevron_left
        </button>
      )}
      {props.gotoNextPage && (
        <button
          className="pagination-button next material-icons"
          onClick={props.gotoNextPage}
        >
          chevron_right
        </button>
      )}
    </>
  );
};
