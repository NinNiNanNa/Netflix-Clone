const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export interface IList {
  id: number;
  original_title: string;
  original_name: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  title: string;
  name: string;
  overview: string;
  vote_average: number;
  media_type: string;
}
export interface IGetLists {
  page: number;
  results: IList[];
  total_pages: number;
  total_results: number;
}

interface ICredit {
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path: null | string;
  character?: string;
  credit_id: string;
}
export interface IGetCreditsResult {
  id: number;
  cast: ICredit[];
  crew: ICredit[];
}

export function getMovies(type: string) {
  return fetch(
    `${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=ko-KR&region=KR`
  ).then((res) => res.json());
}

export function getTvs(type: string, page: number) {
  return fetch(
    `${BASE_URL}/tv/${type}?api_key=${API_KEY}&language=ko-KR&page=${page}`
  ).then((res) => res.json());
}

export function getCredits(path: string, type: string, id: string) {
  return fetch(
    `${BASE_URL}/${path}/${id}/${type}?api_key=${API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}

export function getSearch(keyword: string) {
  return fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&include_adult=false&language=ko-KR&query=${keyword}`
  ).then((res) => res.json());
}
