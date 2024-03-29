import styled from "styled-components";
import Loader from "../Components/Loader";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";
import { useMovieMultipleQuery } from "../hooks/useMovieMultipleQuery";

const Wrapper = styled.div`
  overflow: hidden;
`;

function Home() {
  // API로 가져온 영화 정보
  const [
    { data: nowData, isLoading: loadingNow },
    { data: popularData, isLoading: loadingPopular },
    { data: topData, isLoading: loadingTop },
    { data: upData, isLoading: loadingUp },
  ] = useMovieMultipleQuery();
  return (
    <Wrapper>
      {loadingNow && loadingPopular && loadingTop && loadingUp ? (
        <Loader />
      ) : (
        <>
          <Banner data={nowData?.results[0]} path="movies" type="nowPlaying" />
          <Slider
            title="지금 상영중인 영화"
            data={nowData}
            type="nowPlaying"
            path="movies"
          />
          <Slider
            title="최고평점 Top10 영화"
            data={topData}
            type="topRated"
            path="movies"
          />
          <Slider
            title="인기있는 영화"
            data={popularData}
            type="popular"
            path="movies"
          />
          <Slider
            title="예정 영화"
            data={upData}
            type="upComing"
            path="movies"
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
