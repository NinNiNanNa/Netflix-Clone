import styled from "styled-components";

const Load = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

function Loader() {
  return <Load>Loading...</Load>;
}

export default Loader;
