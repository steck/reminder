import { useState, useEffect } from 'react'
import './App.css'
import { Movie } from './types'
import Navbar from './components/Navbar'
import { fetchMovies } from './services/movieService'

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        const movies = await fetchMovies();
        setMovies(movies);
      } catch (error) {
        console.error('Failed to load movies:', error);
      }
    }

    loadMovies();
  }, []);

  return (
    <div id="root">
      <Navbar />
      
      <div className="container">
        <h1 className="mb-4">Movies</h1>
        <div className="row">
          {movies.map(movie => (
            <div key={movie.id} className="col-md-4 mb-4">
              <div className="card">
                <img 
                  src={movie.posterPath} 
                  className="card-img-top" 
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.overview}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{movie.releaseDate}</small>
                    <span className="badge bg-primary">{movie.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
