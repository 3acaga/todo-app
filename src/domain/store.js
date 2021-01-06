import { configureStore } from "@reduxjs/toolkit";

import createRootReducer from "./createRootReducer";

export const createStore = () => {
  const rootReducer = createRootReducer();

  const store = configureStore({
    reducer: rootReducer,
    // middleware: [routerMiddleware(history), sagaMiddleware],
    devTools: true,
    enhancers: [],
  });
  //

  if (process.env.NODE_ENV === "development") {
    if (module.hot) {
      module.hot.accept("./createRootReducer", () => {
        const createRootReducer = require("./createRootReducer").default;
        store.replaceReducer(createRootReducer());
      });
    }
  }

  return store;
};

const store = createStore();

export default store;
