import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [hits, setHits] = useState([]);
  const [search, setSearch] = useState('react hooks');

  // useEffect(async () => {}, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${search}`
    );
    setHits(results.data.hits);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={handleSearchChange}
        />
        <button>Seach</button>
      </form>

      {!search ? (
        <p> nothing to see here folks</p>
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
