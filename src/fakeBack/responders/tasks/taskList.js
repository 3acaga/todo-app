import { Route } from "fakeBack/Route";

import { dbGetTasks } from "fakeBack/database";

export const taskList = new Route("get", "/tasks", async (params) => {
  const response = await dbGetTasks(params);

  return [200, response];
});
