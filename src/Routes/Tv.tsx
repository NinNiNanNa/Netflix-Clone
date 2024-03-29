import styled from "styled-components";
import Banner from "../Components/Banner";
import Loader from "../Components/Loader";
import { useTvMultipleQuery } from "../hooks/useTvMultipleQuery";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  overflow: hidden;
`;

function Tv() {
  // API로 가져온 영화 정보
  const [
    { data: todayData, isLoading: loadingToday },
    { data: airData, isLoading: loadingAir },
    { data: popularData, isLoading: loadingPopular },
    { data: topData, isLoading: loadingTop },
  ] = useTvMultipleQuery();
  return (
    <Wrapper>
      {loadingToday ? (
        <Loader />
      ) : (
        <>
          <Banner data={todayData?.results[0]} path="tv" type="airingToday" />
          <Slider
            title="지금 방영중인 프로그램"
            data={todayData}
            type="airingToday"
            path="tv"
          />
          <Slider
            title="지금 방영중인 프로그램"
            data={airData}
            type="onTheAir"
            path="tv"
          />
          <Slider
            title="지금 방영중인 프로그램"
            data={popularData}
            type="popular"
            path="tv"
          />
          <Slider
            title="지금 방영중인 프로그램"
            data={topData}
            type="topRated"
            path="tv"
          />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
