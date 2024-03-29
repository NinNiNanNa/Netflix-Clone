const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

// 영화 목록 중 개별 정보 형식 지정
interface IMovie {
  id: number;
  original_title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  title: string;
  overview: string;
  vote_average: number;
}
// 영화 정보 리스트 형식 지정
export interface IGetMoviesResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

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

// 영화 캐스트
interface ICredit {
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path: null | string;
  character?: string;
  credit_id: string;
}
// 영화 크레딧 정보 형식 지정
export interface IGetCreditsMovieResult {
  id: number;
  cast: ICredit[];
  crew: ICredit[];
}

export function getMovies(type: string) {
  return fetch(
    `${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=ko-KR&region=KR`
  ).then((res) => res.json());
}

export const getMovieDetails = (movieId: string) => {
  return fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
  ).then((res) => res.json());
};

export function getCredits(type: string, movieId: string) {
  return fetch(
    `${BASE_URL}/movie/${movieId}/${type}?api_key=${API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}

export function getSimilar(type: string, movieId: string) {
  return fetch(
    `${BASE_URL}/movie/${movieId}/${type}?api_key=${API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}
