import { Route } from "fakeBack/Route";

import { dbDeleteTask } from "fakeBack/database";

export const deleteTask = new Route("delete", "/tasks/:id", async (params) => {
  const { id } = params;
  const response = await dbDeleteTask(id);

  return [200, response];
});
