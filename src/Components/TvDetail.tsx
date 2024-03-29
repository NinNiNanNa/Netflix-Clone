import { motion, useScroll } from "framer-motion";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { makeImagePath } from "../Utils/utils";
import { useQuery } from "@tanstack/react-query";
import { IGetCreditsResult, getCredits } from "../services/common";
import { IGetDetailsTvResult, getTvDetails } from "../services/tv";

const Overlay = styled(motion.div)`
  z-index: 100;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const TvWrap = styled(motion.div)`
  margin: 0 auto;
  z-index: 101;
  position: absolute;
  left: 0;
  right: 0;
  width: 37vw;
  height: 80vh;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 10px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const TvCover = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 450px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgb(20, 20, 20)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;
const TvInfo = styled.div`
  padding: 30px;
  position: absolute;
  top: 150px;
  width: 100%;
`;
const HeadInfo = styled.div`
  display: flex;
  align-items: flex-end;
`;
const Poster = styled.img`
  margin-right: 20px;
  width: 100%;
  max-width: 200px;
  border-radius: 5px;
`;
const Title = styled.div`
  span {
    margin-right: 5px;
    margin-bottom: 10px;
    padding: 3px 10px;
    display: inline-block;
    font-size: 13px;
    background-color: rgba(255, 0, 0, 0.5);
    border-radius: 3px;
  }
  h2 {
    font-size: 32px;
    font-weight: 900;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
  }
  h3 {
    margin: 15px 0;
    font-size: 17px;
  }
  div {
    margin-bottom: 20px;
    display: flex;
    h4 {
      margin-right: 10px;
      font-weight: 900;
      color: ${(props) => props.theme.green};
    }
  }
`;
const BodyInfo = styled.div`
  margin-top: 30px;
`;
const Overview = styled.p`
  margin-top: 30px;
  line-height: 150%;
  color: #969696;
`;
const EtcInfo = styled.div`
  margin-top: 40px;
  span {
    display: flex;
    justify-content: space-between;
    h2 {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 900;
    }
    h3 {
      color: ${(props) => props.theme.white.darker};
    }
  }
`;
const Row = styled.div`
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    height: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.white.darker};
    border-radius: 10px;
  }
`;
const Box = styled.div`
  text-align: center;
  h3 {
    margin: 15px 0 10px;
    height: 40px;
    font-weight: 900;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }
  h4 {
    height: 40px;
    color: ${(props) => props.theme.white.darker};
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }
`;
const PersonImg = styled.div<{ profile: string }>`
  margin: 0 auto;
  width: 90px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url(${(props) => props.profile});
  background-size: cover;
  background-position: center center;
`;
const EpisodeTitle = styled.h2`
  margin-top: 30px;
  font-size: 20px;
  font-weight: 900;
`;
const TvBox = styled.div`
  margin-top: 15px;
  display: flex;
  border: 2px solid ${(props) => props.theme.white.lighter};
  border-radius: 10px;
  overflow: hidden;
`;
const TvImg = styled.div<{ $bgPhoto: string }>`
  width: 35%;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 5px 10px;
`;
const TvTitle = styled.div`
  padding: 20px;
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 900;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  p {
    margin-top: 15px;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }
`;

interface IProps {
  id: string;
  type: string;
}

function TvDetail({ id, type }: IProps) {
  const { scrollY } = useScroll();
  // API로 가져온 TV 상세정보
  const { data: detailData, isLoading: loadingDetail } =
    useQuery<IGetDetailsTvResult>({
      queryKey: ["movie", "details"],
      queryFn: () => getTvDetails(id),
    });
  const { data: creditData, isLoading: loadingCredit } =
    useQuery<IGetCreditsResult>({
      queryKey: ["movie", "credits"],
      queryFn: () => getCredits("tv", "credits", id),
    });
  // Overlay영역 클릭시 경로 변경
  const history = useHistory();
  const onOverlayClicked = () => {
    history.push("/tv");
    document.body.classList.remove("scroll-none");
  };
  return (
    <>
      <Overlay
        onClick={onOverlayClicked}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <TvWrap layoutId={`${type}${id}`} style={{ top: scrollY.get() + 100 }}>
        <TvCover
          $bgPhoto={makeImagePath(detailData?.backdrop_path || "")}
        ></TvCover>
        <TvInfo>
          <HeadInfo>
            <Poster
              src={makeImagePath(detailData?.poster_path || "", "w500")}
            />
            <Title>
              {detailData?.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
              <h2>{detailData?.name}</h2>
              <h3>
                {detailData?.original_name} ・ {detailData?.last_air_date}
              </h3>
              <div>
                <h4>{Math.ceil(Number(detailData?.vote_average) * 10)}%</h4>
              </div>
            </Title>
          </HeadInfo>
          <BodyInfo>
            <Overview>{detailData?.overview}</Overview>
          </BodyInfo>
          {detailData?.last_episode_to_air ? (
            <>
              <EpisodeTitle>이전 회차</EpisodeTitle>
              <TvBox>
                <TvImg
                  $bgPhoto={makeImagePath(
                    detailData?.last_episode_to_air.still_path || ""
                  )}
                ></TvImg>
                <TvTitle>
                  <h2>{detailData.last_episode_to_air.name}</h2>
                  <h3>
                    {detailData.last_episode_to_air.air_date} ・{" "}
                    {detailData.last_episode_to_air.runtime} 분
                  </h3>
                  <p>{detailData.last_episode_to_air.overview}</p>
                </TvTitle>
              </TvBox>
            </>
          ) : null}
          {detailData?.next_episode_to_air ? (
            <>
              <EpisodeTitle>다음 회차</EpisodeTitle>
              <TvBox>
                <TvImg
                  $bgPhoto={makeImagePath(
                    detailData?.next_episode_to_air.still_path || ""
                  )}
                ></TvImg>
                <TvTitle>
                  <h2>{detailData.next_episode_to_air.name}</h2>
                  <h3>
                    {detailData.next_episode_to_air.air_date} ・{" "}
                    {detailData.next_episode_to_air.runtime} 분
                  </h3>
                  <p>{detailData.next_episode_to_air.overview}</p>
                </TvTitle>
              </TvBox>
            </>
          ) : null}
          {creditData?.cast ? (
            <EtcInfo>
              <span>
                <h2>출연진</h2>
                <h3>총 {creditData.cast.length}명</h3>
              </span>
              <Row>
                {creditData.cast.map((cast) => (
                  <Box key={cast.credit_id}>
                    {cast.profile_path === null ? (
                      <PersonImg profile="">이미지없음</PersonImg>
                    ) : (
                      <PersonImg
                        profile={makeImagePath(cast.profile_path || "")}
                      />
                    )}
                    <h3>{cast.name}</h3>
                    <h4>{cast.character}</h4>
                  </Box>
                ))}
              </Row>
            </EtcInfo>
          ) : null}
        </TvInfo>
      </TvWrap>
    </>
  );
}

export default TvDetail;
