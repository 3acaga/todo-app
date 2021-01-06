import Dexie from "dexie";

import { generateTask } from "./responders/tasks/utils";

const dbName = "taskManager";
const dbVersion = 1;

const db = new Dexie(dbName);

db.version(dbVersion).stores({
  tasks: "++id",
});

export const dbCreateTask = async (taskJSON) => {
  const task = JSON.parse(taskJSON);

  await db.open();

  const id = await db.tasks.put(task);
  const storedTask = await db.tasks.get(id);

  db.close();

  return {
    resource: storedTask,
    meta: {
      success: true,
    },
  };
};

export const dbUpdateTask = async (id, taskJSON) => {
  const task = JSON.parse(taskJSON);

  await db.open();

  await db.tasks.update(id, task);
  const storedTask = await db.tasks.get(id);

  db.close();

  return {
    resource: storedTask,
    meta: {
      success: true,
    },
  };
};

export const dbCreateTaskBulk = async (n = 50) => {
  await db.open();

  const lastId = await db.tasks.bulkPut(new Array(n).fill(0).map(() => generateTask()));

  const from = lastId - n;
  const to = lastId;

  const tasks = await db.tasks
    .offset(from)
    .limit(to - from)
    .toArray();

  const total = await db.tasks.count();

  db.close();

  return {
    meta: {
      from,
      to,
      total,
    },
    resources: tasks,
  };
};

window._dbCreateTaskBulk = dbCreateTaskBulk;

export const dbGetTasks = async (limits) => {
  const { from, to } = limits;

  await db.open();

  const tasks = await db.tasks
    .offset(from)
    .limit(to - from)
    .toArray();

  const total = await db.tasks.count();

  db.close();

  return {
    meta: {
      from,
      to: Math.min(to, total),
      total,
    },
    resources: tasks,
  };
};

export const dbDeleteTask = async (id) => {
  await db.open();

  const storedTask = await db.tasks.get(id);
  await db.tasks.delete(id);

  db.close();

  return {
    resource: storedTask,
    meta: {
      success: true,
    },
  };
};
