import styled from "styled-components";
import Loader from "../Components/Loader";
import Banner from "../Components/Banner";
import { useMultipleQuery } from "../hooks/useMultipleQuery";

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
  ] = useMultipleQuery();
  console.log(nowData);

  return (
    <Wrapper>
      {loadingNow ? (
        <Loader />
      ) : (
        <>
          <Banner data={nowData} />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
