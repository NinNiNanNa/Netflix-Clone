const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

// TV프로그램 장르
interface IGenre {
  id: number;
  name: string;
}
interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode_number: number;
  still_path: string;
  runtime: number;
  overview: string;
}
// TV프로그램 상세 정보 형식 지정
export interface IGetDetailsTvResult {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  original_name: string;
  overview: string;
  genres: IGenre[];
  last_air_date: string;
  vote_average: number;
  last_episode_to_air: IEpisode;
  next_episode_to_air: IEpisode;
}

export const getTvDetails = (tvId: string) => {
  return fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=ko-KR`).then(
    (res) => res.json()
  );
};
