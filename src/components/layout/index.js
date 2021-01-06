import React from "react";
import { Layout } from "antd";
import styled from "styled-components/macro";
import PropTypes from "prop-types";

import Header from "./header";

const { Content: AntContent } = Layout;

export const LayoutContext = React.createContext({
  headerHeight: 0,
});

const DefaultLayout = ({ children }) => {
  const headerHeight = 56;

  return (
    <LayoutContext.Provider value={{ headerHeight }}>
      <Layout>
        <Header height={headerHeight} />
        <Content $headerHeight={headerHeight}>{children}</Content>
      </Layout>
    </LayoutContext.Provider>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

const Content = styled(AntContent)`
  min-height: 100vh;
  padding-top: ${({ $headerHeight }) => $headerHeight}px;
  background: #e2e9ff;
`;

export default DefaultLayout;
