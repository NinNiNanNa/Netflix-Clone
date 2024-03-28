import styled from "styled-components";
import Loader from "../Components/Loader";
import Banner from "../Components/Banner";
import { useMultipleQuery } from "../hooks/useMultipleQuery";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  overflow: hidden;
`;
const Wrap = styled.div`
  padding: 0 60px;
  position: relative;
  top: -100px;
`;

function Home() {
  // API로 가져온 영화 정보
  const [
    { data: nowData, isLoading: loadingNow },
    { data: popularData, isLoading: loadingPopular },
    { data: topData, isLoading: loadingTop },
    { data: upData, isLoading: loadingUp },
  ] = useMultipleQuery();

  return (
    <Wrapper>
      {loadingNow && loadingPopular && loadingTop && loadingUp ? (
        <Loader />
      ) : (
        <>
          <Banner data={nowData} />
          <Wrap>
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
          </Wrap>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
