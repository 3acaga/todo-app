import { Route } from "fakeBack/Route";

import { dbCreateTask } from "fakeBack/database";

export const createTask = new Route("post", "/tasks", async (params, data) => {
  const response = await dbCreateTask(data);

  return [200, response];
});
