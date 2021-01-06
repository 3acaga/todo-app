import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";

import store from "domain/store";

const Providers = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <Router>{children}</Router>
    </ReduxProvider>
  );
};

Providers.propTypes = {
  children: PropTypes.node,
};

export default Providers;
