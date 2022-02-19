import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../src/App.css';

function App() {
  const [hits, setHits] = useState([]);
  const [search, setSearch] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ref = useRef();

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
    try {
      const results = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${search}`
      );
      const ten = results.data.hits.splice(1, 10);
      setHits(ten);
      setSearch('');
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="container max-w-lg mx-auto p-4 m-2 bg-indigo-100	 shadow-lg rounded  ">
      <img
        src="https://miro.medium.com/max/768/1*0j4xd4B_o-jxiaM9QYqgWw.png"
        alt="hooks"
        width="100" height="100"
        className='float-right'
      />
      <h1 className="text-4xl text-purple-900		 font-thin"> Hook News </h1>

      <form onSubmit={handleSubmit} className="mb-2">
        <input
          ref={ref}
          type="text"
          placeholder="search"
          value={search}
          onChange={handleSearchChange}
          className="border p-1"
        />

        <button
          className=" bg-green-100 p-1 rounded m-1 border-0"
          onClick={handleClear}
          type="button"
        >
          Clear
        </button>

        <button className=" bg-red-300 p-1 rounded border-0">Seach</button>
      </form>

      {loading ? (
        <button type="button" class="bg-rose-600 ..." disabled>
          <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
          Processing
        </button>
      ) : (
        <ul className="leading-normal">
          {hits.map((hit) => {
            return (
              <li className="my-3" key={hit.objectID}>
                <a className="text-purple-900	" href={hit.url}>
                  {hit.title}
                </a>

                <hr></hr>
              </li>
            );
          })}
        </ul>
      )}

      {error && <div>{error.message}</div>}
    </div>
  );
}

export default App;
