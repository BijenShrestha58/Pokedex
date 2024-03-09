export const PaginationNumbers = (props) => {
  const handleInputChange = (e) => {
    const newPageNumber = parseInt(e.target.value, 10);
    props.onPageNumberChange(newPageNumber);
  };

  return (
    <>
      <input
        type="number"
        onChange={handleInputChange}
        value={props.pageNumber}
      />
    </>
  );
};
