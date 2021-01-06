import { Route } from "fakeBack/Route";

import { dbUpdateTask } from "fakeBack/database";

export const updateTask = new Route("put", "/tasks/:id", async (params, data) => {
  const { id } = params;

  const response = await dbUpdateTask(id, data);

  return [200, response];
});
