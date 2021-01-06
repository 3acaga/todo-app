import { createReducer, createSelector } from "@reduxjs/toolkit";

import { getTaskListAction, deleteTaskAction, updateTaskAction, createTaskAction } from "./actions";

const initialState = {
  meta: {
    isLoading: false,
    isDataLoaded: false,
    error: "",
    //
    loaded: 0,
    total: -1,
  },
  resources: [],
};

export const tasksReducer = createReducer(initialState, {
  ////////////////////////////////////////////////////////////////////////////
  [getTaskListAction.pending]: (draft) => {
    draft.meta.isLoading = true;
  },

  [getTaskListAction.fulfilled]: (draft, { payload }) => {
    draft.meta.isLoading = false;
    draft.meta.isDataLoaded = true;
    draft.meta.loaded += payload.resources.length;
    draft.meta.total = payload.meta.total;

    draft.resources.push(...payload.resources);
  },

  [getTaskListAction.rejected]: (draft, { payload }) => {
    draft.meta.isLoading = false;
    draft.meta.error = payload;
  },
  ////////////////////////////////////////////////////////////////////////////
  [createTaskAction.fulfilled]: (draft, { payload }) => {
    if (draft.meta.loaded === draft.meta.total) {
      draft.resources.push(payload.resource);
      draft.meta.loaded += 1;
    }

    draft.meta.total += 1;
  },
  ////////////////////////////////////////////////////////////////////////////
  [deleteTaskAction.fulfilled]: (draft, { payload }) => {
    draft.resources = draft.resources.filter(({ id }) => id !== payload.resource.id);
  },
  ////////////////////////////////////////////////////////////////////////////
  [updateTaskAction.fulfilled]: (draft, { payload }) => {
    draft.resources.splice(
      draft.resources.findIndex(({ id }) => id === payload.resource.id),
      1,
      payload.resource,
    );
  },
});

const tasks = (state) => state.tasks;
export const tasksMetaSelector = createSelector(tasks, (tasks) => tasks.meta);
export const tasksResourcesSelector = createSelector(tasks, (tasks) => tasks.resources);
