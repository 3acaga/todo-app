import { api, makeUrl } from "./utils";

export const ApiClient = {
  taskList: api("get", "/tasks"),
  createTask: api("post", "/tasks"),
  updateTask: api("put", makeUrl`/tasks/${"id"}`),
  deleteTask: api("delete", makeUrl`/tasks/${"id"}`),
};
