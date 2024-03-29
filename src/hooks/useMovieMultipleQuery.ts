import { useQuery } from "@tanstack/react-query";
import { IGetLists, getMovies } from "../services/common";

export const useMovieMultipleQuery = () => {
  const nowPlaying = useQuery<IGetLists>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: () => getMovies("now_playing"),
  });
  const popular = useQuery<IGetLists>({
    queryKey: ["movies", "popular"],
    queryFn: () => getMovies("popular"),
  });
  const topRated = useQuery<IGetLists>({
    queryKey: ["movies", "topRated"],
    queryFn: () => getMovies("top_rated"),
  });
  const upComing = useQuery<IGetLists>({
    queryKey: ["movies", "upComing"],
    queryFn: () => getMovies("upcoming"),
  });
  return [nowPlaying, popular, topRated, upComing];
};
