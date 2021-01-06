import { render, cleanup, screen, act, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "App";

beforeEach(async () => {
  render(<App />);
});

afterEach(() => {
  cleanup();
});

describe("Tasks load", () => {
  const testRowsN = 177;

  beforeAll(() => {
    window._dbCreateTaskBulk(testRowsN);
  });

  afterAll(() => {
    window._dbDestroy();
  });

  test("Load 100 tasks on initializing", async () => {
    const loader = screen.getByTestId("tasks-initial-loader");
    expect(loader).toBeInTheDocument();

    const rows = await waitFor(() => screen.getAllByTestId("task-row"));

    expect(rows.length).toBe(100);
  });

  test("Load additional tasks on scroll down", async () => {
    const rows = await waitFor(() => screen.getAllByTestId("task-row"));

    const tasksContainer = rows[0].parentElement;

    fireEvent.scroll(window, { scrollY: tasksContainer.scrollHeight - tasksContainer.offsetHeight });

    const loader = screen.getByTestId("tasks-infinite-loader");
    expect(loader).toBeInTheDocument();
  });
});

describe("Tasks manipulation", () => {
  const TASK_DESCR = "TASK DESCRIPTION";
  const TASK_DATE = "2021-01-06";

  test("createTask", async () => {
    screen.getByTestId("add-task-button").click();

    const form = await waitFor(() => screen.getByTestId("add-task-form"));

    const descriptionInput = form.querySelector('textarea[name="description"]');
    const validUntilInput = form.querySelector('input[name="validUntil"]');
    const okButton = screen.getByTestId("add-task-confirm");

    expect(descriptionInput.value).toBe("");
    await act(async () => await fireEvent.change(descriptionInput, { target: { value: TASK_DESCR } }));
    expect(descriptionInput.value).toBe(TASK_DESCR);

    expect(validUntilInput.value).toBe("");
    userEvent.type(validUntilInput, TASK_DATE);
    expect(validUntilInput.value).toBe(TASK_DATE);

    okButton.click();

    await waitFor(() => screen.getByText(TASK_DESCR));
  });
});
