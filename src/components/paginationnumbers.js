export const PaginationNumbers = (props) => {
  const handleInputChange = (e) => {
    const newPageNumber = parseInt(e.target.value, 10);
    props.onPageNumberChange(newPageNumber);
  };

  return (
    <>
      <input
        type="number"
        min="1"
        max={props.maxPageNumber}
        onChange={handleInputChange}
        value={props.pageNumber}
      />
    </>
  );
};
