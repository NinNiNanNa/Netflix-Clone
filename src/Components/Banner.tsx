import styled from "styled-components";
import { CgInfo } from "react-icons/cg";
import { makeImagePath } from "../Utils/utils";
import { IGetMoviesResult } from "../services/movie";
import { useHistory } from "react-router-dom";

const BannerWrap = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(20, 20, 20, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;
const BannerInfo = styled.div`
  padding: 0 60px;
  position: relative;
  top: -50px;
  h1 {
    margin-bottom: 30px;
    font-size: 68px;
    font-weight: 900;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
  }
  p {
    margin-bottom: 20px;
    width: 50%;
    font-size: 25px;
    line-height: 130%;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: keep-all;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
  }
`;
const DetailBtn = styled.div`
  padding: 10px 20px;
  width: 190px;
  display: flex;
  align-items: center;
  font-size: 25px;
  background-color: rgba(109, 109, 110, 0.9);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(109, 109, 110, 0.5);
  }
  svg {
    margin-right: 15px;
  }
`;

interface IProps {
  data?: IGetMoviesResult;
}

function Banner({ data }: IProps) {
  const history = useHistory();
  const onBoxClicked = (id: number) => {
    history.push(`/movies/nowPlaying/${id}`);
    document.body.classList.add("scroll-none");
  };
  return (
    <BannerWrap $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
      <BannerInfo>
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>
        <DetailBtn onClick={() => onBoxClicked(Number(data?.results[0].id))}>
          <CgInfo />
          상세 정보
        </DetailBtn>
      </BannerInfo>
    </BannerWrap>
  );
}

export default Banner;
