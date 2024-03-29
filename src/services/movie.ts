const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

// 영화 장르
interface IGenre {
  id: number;
  name: string;
}
// 영화 상세 정보 형식 지정
export interface IGetDetailsMovieResult {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  original_title: string;
  overview: string;
  genres: IGenre[];
  release_date: string;
  runtime: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

export const getMovieDetails = (movieId: string) => {
  return fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
  ).then((res) => res.json());
};

export function getSimilar(type: string, movieId: string) {
  return fetch(
    `${BASE_URL}/movie/${movieId}/${type}?api_key=${API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}
