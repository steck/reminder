import { Movie } from '../types';

const API_BASE_URL = '/api/movies';

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as Movie[];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
