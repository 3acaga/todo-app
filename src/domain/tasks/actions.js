import { createAsyncThunk } from "@reduxjs/toolkit";

import { ApiClient } from "lib/api";

export const getTaskListAction = createAsyncThunk("tasks/getTaskList", async (params) => {
  const response = await ApiClient.taskList({ params });
  return response.data;
});

export const createTaskAction = createAsyncThunk("tasks/createTask", async (data) => {
  const response = await ApiClient.createTask({ data });
  return response.data;
});

export const updateTaskAction = createAsyncThunk("tasks/updateTask", async (config) => {
  const response = await ApiClient.updateTask(config);
  return response.data;
});

export const deleteTaskAction = createAsyncThunk("tasks/deleteTask", async (params) => {
  const response = await ApiClient.deleteTask({ params });
  return response.data;
});
