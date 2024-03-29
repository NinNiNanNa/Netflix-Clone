import { useQuery } from "@tanstack/react-query";
import { IGetLists, getTvs } from "../services/common";

export const useTvMultipleQuery = () => {
  const airingToday = useQuery<IGetLists>({
    queryKey: ["tv", "airingToday"],
    queryFn: () => getTvs("airing_today", 1),
  });
  const onTheAir = useQuery<IGetLists>({
    queryKey: ["tv", "onTheAir"],
    queryFn: () => getTvs("on_the_air", 3),
  });
  const popular = useQuery<IGetLists>({
    queryKey: ["tv", "popular"],
    queryFn: () => getTvs("popular", 5),
  });
  const topRated = useQuery<IGetLists>({
    queryKey: ["tv", "topRated"],
    queryFn: () => getTvs("top_rated", 1),
  });
  return [airingToday, onTheAir, popular, topRated];
};
