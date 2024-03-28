import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDetectClickOutside } from "react-detect-click-outside";

const Nav = styled(motion.nav)`
  padding: 20px 60px;
  z-index: 99;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled(motion.svg)`
  margin-right: 25px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: ${(props) => props.theme.red};
  }
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  margin-left: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: 500;
`;
const ActiveLine = styled(motion.span)`
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -10px;
  width: 100%;
  height: 3px;
  background-color: ${(props) => props.theme.red};
`;
const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;
`;
const IconWrap = styled(motion.div)`
  svg {
    width: 24px;
    height: 24px;
  }
`;
const Input = styled(motion.input)`
  padding: 10px 10px 10px 50px;
  z-index: -1;
  position: absolute;
  right: 0;
  width: 300px;
  font-size: 14px;
  color: ${(props) => props.theme.white.lighter};
  background-color: rgba(0, 0, 0, 0.5);
  outline: none;
  border: 1px solid ${(props) => props.theme.white.lighter};
  transform-origin: right;
`;

// 넷플릭스 로고 애니메이션
const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [1, 0, 1],
    transition: {
      repeat: Infinity,
    },
  },
};
// nav 애니메이션
const navVariants = {
  top: {
    background: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
  },
  scroll: {
    background: "linear-gradient(rgba(0, 0, 0, 1),rgba(19, 19, 19, 1))",
  },
};

// 검색창 인터페이스
interface IForm {
  keyword: string;
}

function Header() {
  // 현재 어느 route에 있는지 반환
  const homeMatch = useRouteMatch("/");
  const tvMatch = useRouteMatch("/tv");
  // nav 애니메이션 제어
  const navAnimation = useAnimation();
  // scroll 위치 반환
  const { scrollY } = useScroll();
  // scroll 위치에 따른 nav 애니메이션
  useMotionValueEvent(scrollY, "change", (scroll) => {
    if (scroll > 70) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });
  // 검색창 유효성 검사
  const { register, handleSubmit, setValue, setFocus } = useForm<IForm>();
  // 페이지 제어 -> 이동
  const history = useHistory();
  const onValid = (data: IForm) => {
    history.push(`/search?keyword=${data.keyword}`);
    setValue("keyword", "");
  };
  // 검색창이 활성화 되었는지 판단
  const [searchOpen, setSearchOpen] = useState(false);
  // input 애니메이션 제어
  const inputAnimation = useAnimation();
  const toggleSearch = () => {
    setFocus("keyword");
    if (searchOpen) {
      inputAnimation.start({ scaleX: 0 });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
    setValue("keyword", "");
  };
  // 검색창 외부 영역 클릭 시 검색창 비활성화
  const disableSearch = () => {
    if (searchOpen === true) inputAnimation.start({ scaleX: 0 });
    setSearchOpen(false);
  };
  const outRef = useDetectClickOutside({
    onTriggered: disableSearch,
    // esc 누르면 비활성화 되는 기능 해제
    disableKeys: true,
  });
  return (
    <Nav variants={navVariants} initial="top" animate={navAnimation}>
      <Col>
        <Logo
          variants={logoVariants}
          initial="normal"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
            fill="#d81f26"
          />
        </Logo>
        <Items>
          <Item>
            <Link to="/">
              홈 {homeMatch?.isExact && <ActiveLine layoutId="active" />}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              TV 프로그램 {tvMatch?.isExact && <ActiveLine layoutId="active" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)} ref={outRef}>
          <IconWrap
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -265 : 0 }}
            transition={{ type: "linear" }}
          >
            <IoSearch />
          </IconWrap>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            initial={{ scaleX: 0 }}
            animate={inputAnimation}
            transition={{ type: "linear" }}
            placeholder="제목,장르,사람"
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
