import { motion, useScroll } from "framer-motion";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { makeImagePath } from "../Utils/utils";
import { useQuery } from "@tanstack/react-query";
import {
  IGetDetailsMovieResult,
  getMovieDetails,
  getSimilar,
} from "../services/movie";
import { IGetCreditsResult, IGetLists, getCredits } from "../services/common";

const Overlay = styled(motion.div)`
  z-index: 100;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const MovieWrap = styled(motion.div)`
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
const MovieCover = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 450px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgb(20, 20, 20)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;
const MovieInfo = styled.div`
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
const TagLine = styled.blockquote`
  padding: 15px;
  border-left: 3px solid #f3d609;
  font-size: 20px;
  font-style: italic;
  line-height: 150%;
  color: ${(props) => props.theme.white.lighter};
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
const MovieBox = styled.div`
  text-align: center;
  cursor: pointer;
`;
const MovieImg = styled.div<{ $bgPhoto: string }>`
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 5px 10px;
`;
const MovieTitle = styled.h3`
  width: 200px;
  margin-top: 15px;
  font-weight: 900;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

interface IProps {
  id: string;
  type: string;
}

function MovieDetail({ id, type }: IProps) {
  const { scrollY } = useScroll();
  // API로 가져온 영화 상세정보
  const { data: detailData, isLoading: loadingDetail } =
    useQuery<IGetDetailsMovieResult>({
      queryKey: ["movie", "details"],
      queryFn: () => getMovieDetails(id),
    });
  const { data: creditData, isLoading: loadingCredit } =
    useQuery<IGetCreditsResult>({
      queryKey: ["movie", "credits"],
      queryFn: () => getCredits("movie", "credits", id),
    });
  const { data: similarData, isLoading: loadingSimilar } = useQuery<IGetLists>({
    queryKey: ["movie", "similar"],
    queryFn: () => getSimilar("similar", id),
  });
  // Overlay영역 클릭시 경로 변경
  const history = useHistory();
  const onOverlayClicked = () => {
    history.goBack();
    document.body.classList.remove("scroll-none");
  };
  return (
    <>
      <Overlay
        onClick={onOverlayClicked}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <MovieWrap layoutId={`${type}${id}`} style={{ top: scrollY.get() + 100 }}>
        <MovieCover
          $bgPhoto={makeImagePath(detailData?.backdrop_path || "")}
        ></MovieCover>
        <MovieInfo>
          <HeadInfo>
            <Poster
              src={makeImagePath(detailData?.poster_path || "", "w500")}
            />
            <Title>
              {detailData?.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
              <h2>{detailData?.title}</h2>
              <h3>
                {detailData?.original_title} ・{" "}
                {detailData?.release_date?.slice(0, 4)}
              </h3>
              <div>
                <h4>{Math.ceil(Number(detailData?.vote_average) * 10)}%</h4>
                <h5>
                  {Math.floor(Number(detailData?.runtime) / 60)}시간{" "}
                  {Number(detailData?.runtime) % 60}분
                </h5>
              </div>
            </Title>
          </HeadInfo>
          <BodyInfo>
            {detailData?.tagline ? (
              <TagLine>{detailData?.tagline}</TagLine>
            ) : null}
            <Overview>{detailData?.overview}</Overview>
          </BodyInfo>
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
          {creditData?.crew ? (
            <EtcInfo>
              <span>
                <h2>제작진</h2>
                <h3>총 {creditData.crew.length}명</h3>
              </span>
              <Row>
                {creditData.crew.map((crew) => (
                  <Box key={crew.credit_id}>
                    {crew.profile_path === null ? (
                      <PersonImg profile="">이미지없음</PersonImg>
                    ) : (
                      <PersonImg
                        profile={makeImagePath(crew.profile_path || "")}
                      />
                    )}
                    <h3>{crew.name}</h3>
                    <h4>{crew.known_for_department}</h4>
                  </Box>
                ))}
              </Row>
            </EtcInfo>
          ) : null}
          {similarData ? (
            <EtcInfo>
              <span>
                <h2>비슷한 영화</h2>
                <h3>총 {similarData.results.length}편</h3>
              </span>
              <Row>
                {similarData.results.map((similar) => (
                  <MovieBox key={similar.id}>
                    {similar.backdrop_path == null ? (
                      <MovieImg $bgPhoto="">이미지 없음</MovieImg>
                    ) : (
                      <MovieImg
                        $bgPhoto={makeImagePath(
                          similar.backdrop_path || "",
                          "w500"
                        )}
                      />
                    )}
                    <MovieTitle>{similar.title}</MovieTitle>
                  </MovieBox>
                ))}
              </Row>
            </EtcInfo>
          ) : null}
        </MovieInfo>
      </MovieWrap>
    </>
  );
}

export default MovieDetail;
