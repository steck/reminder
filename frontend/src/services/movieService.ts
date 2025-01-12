import { Movie, MoviesResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const MOVIES_ENDPOINT = '/movies';

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}${MOVIES_ENDPOINT}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: MoviesResponse = await response.json();
    return data.movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
