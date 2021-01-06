import React from "react";
import { Layout, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import styled from "styled-components/macro";
import { colors } from "./colors";

const { Header: AntHeader } = Layout;

const Header = ({ height }) => {
  return (
    <Wrapper height={height}>
      <MenuButton
        //
        type="text"
        size="large"
        shape="circle"
        icon={<MenuOutlined style={{ fontSize: 22 }} />}
      />

      <Content>TODO App</Content>
    </Wrapper>
  );
};

const Wrapper = styled(AntHeader)`
  position: fixed;
  width: 100%;
  z-index: 1;

  display: flex;
  align-items: center;
  height: ${({ height }) => height}px;

  background: ${colors.primary};
  color: white;
`;

const MenuButton = styled(Button)`
  color: white;
`;

const Content = styled.div`
  width: 100%;
  text-align: center;
  font-weight: bold;
`;

export default React.memo(Header);
