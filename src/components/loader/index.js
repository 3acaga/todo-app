import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components/macro";

const Loader = () => {
  return (
    <Wrapper>
      <LoadingOutlined />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & span {
    font-size: 36px;
  }
`;

export default Loader;
