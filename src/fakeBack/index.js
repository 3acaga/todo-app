import { Router } from "./Router";

import { taskList } from "./responders/tasks/taskList";
import { createTask } from "./responders/tasks/createTask";
import { updateTask } from "./responders/tasks/updateTask";
import { deleteTask } from "./responders/tasks/deleteTask";

export const mocksRouter = new Router([
  //
  taskList,
  createTask,
  updateTask,
  deleteTask,
]);

export default mocksRouter;
