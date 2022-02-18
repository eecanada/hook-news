import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Spinner, Button } from 'react-bootstrap';
function App() {
  const [hits, setHits] = useState([]);
  const [search, setSearch] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const ref = useRef();

  // useEffect(async () => {}, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClear = () => {
    setSearch('');
    if (ref.current) ref.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const results = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${search}`
    );
    setHits(results.data.hits);
    setSearch('');
    setLoading(false);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          ref={ref}
          type="text"
          placeholder="search"
          value={search}
          onChange={handleSearchChange}
        />
        <button onClick={handleClear}>Clear</button>
        <button>Seach</button>
      </form>

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <ul>
          {hits.map((hit) => {
            return (
              <li key={hit.objectID}>
                <a href={hit.url}>{hit.title}</a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
