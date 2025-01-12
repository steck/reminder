import { Movie, MoviesResponse } from '../types';

const API_BASE_URL = '/api';

export const fetchMovies = async (): Promise<Movie[]> => {
    const response = await fetch(`${API_BASE_URL}/movies`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: MoviesResponse = await response.json();
    return data.movies;
};
