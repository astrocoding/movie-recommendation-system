import React, { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!title.trim()) {
      setError('Harap masukkan sesuatu ke kotak pencarian!');
      setRecommendations([]);
      return;
    }

    try {
      const response = await fetch('https://recommendation-api-u0ds.onrender.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      const data = await response.json();

      if (response.ok) {
        setRecommendations(Object.values(data.recommendations));
        setError('');
      } else {
        setError(data.error);
        setRecommendations([]);
      }
    } catch (error) {
      setError('An unexpected error occurred.');
      setRecommendations([]);
    }
  };

  return (
    <div className="App">
      <h1>Movie Recommendation</h1>
      <div className="search-container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="recommendations">
        {recommendations.length > 0 && <h2>Recommendations for "{title}"</h2>}
        <ul>
          {recommendations.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
