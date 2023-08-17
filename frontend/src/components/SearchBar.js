const SearchBar = ({ onSearch }) => {

  const handleSearch = (e) => {
    onSearch(e.target.value); // Call the onSearch callback with the current input value
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className='search-input'
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
