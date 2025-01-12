export interface ItemsResult {
  message: string;
}

export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  overview: string;
  posterPath: string;
  rating: number;
  genres: string[];
}
