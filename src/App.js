import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [hits, setHits] = useState([]);
  
  useEffect(async () => {
    const results = await axios.get(
      'http://hn.algolia.com/api/v1/search?query=reacthooks'
    );
    setHits(results.data.hits);
  }, []);

  return (
    <div className="App">
      <ul>
        {hits.map((hit) => {
          return (
            <li key={hit.objectID}>
              <a href={hit.url}>{hit.title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
