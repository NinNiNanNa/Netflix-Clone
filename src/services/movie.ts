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

export function getMovies(type: string) {
  return fetch(
    `${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=ko-KR&region=KR`
  ).then((res) => res.json());
}
