import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult, getMovies } from "../services/movie";

export const useMultipleQuery = () => {
  const nowPlaying = useQuery<IGetMoviesResult>({
    queryKey: ["nowPlaying"],
    queryFn: () => getMovies("now_playing"),
  });
  const popular = useQuery<IGetMoviesResult>({
    queryKey: ["popular"],
    queryFn: () => getMovies("popular"),
  });
  const topRated = useQuery<IGetMoviesResult>({
    queryKey: ["topRated"],
    queryFn: () => getMovies("top_rated"),
  });
  const upComing = useQuery<IGetMoviesResult>({
    queryKey: ["upComing"],
    queryFn: () => getMovies("upcoming"),
  });
  return [nowPlaying, popular, topRated, upComing];
};
