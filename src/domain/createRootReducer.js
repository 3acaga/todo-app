import { combineReducers } from "@reduxjs/toolkit";

import { tasksReducer } from "./tasks/reducer";

const createRootReducer = () => {
  return combineReducers({
    tasks: tasksReducer,
  });
};

export default createRootReducer;
