import { useQuery } from "@tanstack/react-query";
import { IGetLists, getSearch } from "../services/common";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Loader from "../Components/Loader";
import { makeImagePath } from "../Utils/utils";
import MovieDetail from "../Components/MovieDetail";
import TvDetail from "../Components/TvDetail";

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 100px 60px;
  hr {
    margin: 60px 0;
  }
`;
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: 900;
`;
const NotFound = styled.p`
  padding: 50px 0;
  width: 100%;
  text-align: center;
  font-size: 18px;
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 30px 20px;
  align-items: flex-start;
`;
const Box = styled.div`
  text-align: center;
  cursor: pointer;
  h3 {
    margin-top: 15px;
    font-size: 18px;
    font-weight: 900;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;
const Img = styled.div<{ $bgPhoto: string }>`
  height: 200px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 5px 10px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IGetLists>({
    queryKey: ["search", keyword],
    queryFn: () => getSearch(keyword!),
  });

  const movies = data?.results.filter((item) => item.media_type === "movie");
  const tvs = data?.results.filter((item) => item.media_type === "tv");

  const history = useHistory();
  const onMovieClicked = (path: string, movieId: number) => {
    history.push(`/search/${path}/${movieId}?keyword=${keyword}`);
    document.body.classList.add("scroll-none");
  };
  const onTvClicked = (path: string, tvId: number) => {
    history.push(`/search/${path}/${tvId}?keyword=${keyword}`);
    document.body.classList.add("scroll-none");
  };
  const movieMatch = useRouteMatch<{ movieId: string }>(
    "/search/movie/:movieId"
  );
  console.log(movieMatch);

  const tvMatch = useRouteMatch<{ tvId: string }>("/search/tv/:tvId");
  console.log(tvMatch);
  return (
    <>
      <Wrap>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Title>"{keyword}" 에 대한 영화 검색결과</Title>
            {movies && movies.length > 0 ? (
              <Content>
                {movies?.map((movie) => (
                  <Box
                    key={movie.id}
                    onClick={() => onMovieClicked(movie.media_type, movie.id)}
                  >
                    <Img
                      $bgPhoto={makeImagePath(movie.backdrop_path || "w500")}
                    />
                    <h3>{movie.title}</h3>
                  </Box>
                ))}
              </Content>
            ) : (
              <NotFound>검색 결과가 없습니다.</NotFound>
            )}
            <hr />
            <Title>"{keyword}" 에 대한 TV 프로그램 검색결과</Title>
            {tvs && tvs.length > 0 ? (
              <Content>
                {tvs?.map((tv) => (
                  <Box
                    key={tv.id}
                    onClick={() => onTvClicked(tv.media_type, tv.id)}
                  >
                    <Img $bgPhoto={makeImagePath(tv.backdrop_path || "w500")} />
                    <h3>{tv.name}</h3>
                  </Box>
                ))}
              </Content>
            ) : (
              <NotFound>검색 결과가 없습니다.</NotFound>
            )}
          </>
        )}
      </Wrap>
      {movieMatch ? (
        <MovieDetail id={movieMatch.params.movieId} type="" />
      ) : null}
      {tvMatch ? <TvDetail id={tvMatch.params.tvId} type="" /> : null}
    </>
  );
}

export default Search;
