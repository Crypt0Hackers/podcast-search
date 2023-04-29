import { useState } from 'react';
import axios from 'axios';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [podcasts, setPodcasts] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get('https://listen-api-test.listennotes.com/api/v2/search', {
      params: { q: query },
    });

    setPodcasts(response.data.results);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Podcasts</h1>
      <div className="flex items-center mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for podcasts here..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="ml-4 px-4 py-2 text-white font-semibold bg-blue-500 rounded-lg focus:outline-none hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {podcasts.map((podcast) => (
          <a href={podcast.listennotes_url} target="_blank" rel="noopener noreferrer">
            <li key={podcast.id} className="bg-white rounded-lg shadow-lg p-4">
              <img src={podcast.thumbnail} alt={podcast.title_original} className="w-full rounded-lg mb-4" />
              <h2 className="text-2xl font-bold mb-2">{podcast.title_original}</h2>
              <p className="text-gray-700">{podcast.publisher_original}</p>
            </li>
          </a>
        ))}
      </ul>
    </div>
  );

}
