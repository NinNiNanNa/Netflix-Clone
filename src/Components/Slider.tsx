import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { IGetMoviesResult } from "../services/movie";
import { makeImagePath } from "../Utils/utils";
import MovieDetail from "./MovieDetail";

const Wrap = styled.div`
  padding: 0 60px;
  position: relative;
  top: -100px;
`;
const Title = styled.h2`
  margin-bottom: 15px;
  font-size: 25px;
  font-weight: 900;
`;
const SliderWrap = styled.div`
  margin-bottom: 100px;
  position: relative;
  height: 200px;
`;
const Row = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;
const Box = styled(motion.div)<{ $bgPhoto: string }>`
  height: 200px;
  border-radius: 4px;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
`;
const InfoWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 1;
`;
const Info = styled(motion.div)`
  padding: 15px;
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  opacity: 0;
  background-color: ${(props) => props.theme.black.lighter};
  h3 {
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 900;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  h4 {
    margin-bottom: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  div {
    display: flex;
    justify-content: space-between;
    h5 {
      font-weight: 900;
      color: ${(props) => props.theme.green};
    }
  }
`;
const ArrowWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;
const Arrow = styled(motion.div)`
  z-index: 1;
  padding: 0 10px;
  display: flex;
  align-items: center;
  font-size: 40px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
`;

// 슬라이드 안 Box 애니메이션
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: (idx: number) => ({
    scale: 1.2,
    x: idx === 0 ? 80 : idx === 5 ? -80 : 0,
    y: -50,
    borderRadius: "4px 4px 0 0",
    boxShadow: "rgba(0, 0, 0, 0.75) 0px 5px 10px",
    transition: {
      type: "tween",
      duration: 0.3,
      delay: 0.5,
    },
  }),
};
// Box 안 Info 애니메이션
const infoVariants = {
  hover: {
    top: "100%",
    borderRadius: "0 0 4px 4px",
    boxShadow: "rgba(0, 0, 0, 0.75) 0px 5px 10px",
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
};

interface IProps {
  title: string;
  data?: IGetMoviesResult;
  type: string;
  path: string;
}

function Slider({ title, data, type, path }: IProps) {
  // 현재 윈도우 너비 반환
  const width = useWindowDimensions();
  // 슬라이드 애니메이션
  const rowVariants = {
    hidden: (isback: boolean) => ({
      x: isback ? -width : width,
    }),
    visible: {
      x: 0,
    },
    exit: (isback: boolean) => ({
      x: isback ? width : -width,
    }),
  };
  // 한 슬라이드에 보여줄 Box 수
  const OFFSET = 6;
  // 슬라이드의 페이지(Row) 상태
  const [index, setIndex] = useState(0);
  // 슬라이드 애니메이션 중첩 실행 방지
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [back, setBack] = useState(false);
  const nextIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(false);
      // 가져온 데이터의 수 (배너에 들어간 데이터 1개 제외)
      const totalData = data?.results.length - 1;
      // 슬라이드의 최대 페이지
      const maxPage = Math.floor(totalData / OFFSET) - 1;
      // index가 최대페이지 수와 같으면 0으로 초기화 아니라면 1씩 증가
      setIndex((prev) => (prev === maxPage ? 0 : prev + 1));
    }
  };
  const prevIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(true);
      const totalData = data?.results.length - 1;
      const maxPage = Math.floor(totalData / OFFSET) - 1;
      // index가 0과 같다면 최대페이지 수로 아니라면 1씩 감소
      setIndex((prev) => (prev === 0 ? maxPage : prev - 1));
    }
  };
  // Box 클릭시 경로 변경
  const history = useHistory();
  const onBoxClicked = (id: number) => {
    history.push(`/${path}/${type}/${id}`);
    document.body.classList.add("scroll-none");
  };
  const routeMatch = useRouteMatch<{ id: string }>(`/${path}/${type}/:id`);
  console.log(routeMatch);
  return (
    <>
      <Wrap>
        <Title>{title}</Title>
        <SliderWrap>
          <ArrowWrap>
            <Arrow
              onClick={prevIndex}
              whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            >
              <IoIosArrowBack />
            </Arrow>
            <Arrow
              onClick={nextIndex}
              whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            >
              <IoIosArrowForward />
            </Arrow>
          </ArrowWrap>
          <AnimatePresence
            custom={back}
            initial={false}
            onExitComplete={toggleLeaving}
          >
            <Row
              key={index}
              custom={back}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
            >
              {data?.results
                .slice(1)
                .slice(OFFSET * index, OFFSET * index + OFFSET)
                .map((data, idx) => (
                  <Box
                    layoutId={`${type}${data.id}`}
                    key={data.id}
                    custom={idx}
                    onClick={() => onBoxClicked(data.id)}
                    variants={boxVariants}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: "tween" }}
                    $bgPhoto={makeImagePath(data.backdrop_path, "w500")}
                  >
                    <InfoWrap>
                      <Info variants={infoVariants}>
                        <h3>{data.title}</h3>
                        <h4>{data.original_title}</h4>
                        <div>
                          <h5>{Math.ceil(data.vote_average * 10)}%</h5>
                          <h6>{data.release_date.slice(0, 4)}</h6>
                        </div>
                      </Info>
                    </InfoWrap>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
        </SliderWrap>
      </Wrap>
      {routeMatch && path === "movies" ? (
        <MovieDetail id={routeMatch.params.id} type={type} />
      ) : null}
    </>
  );
}

export default Slider;
