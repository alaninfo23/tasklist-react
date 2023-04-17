import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";
import {
  INPUT_TASK_ID,
  ADD_BUTTON_ID,
  TASK_NAME_ID,
  TASK_TITLE_ID,
  INFO_TASK_BUTTON_ID,
  BACK_BUTTON_ID,
  DELETE_TASK_ID,
  TASK_CONTAINER_ID,
  addTask,
  checkTaskContainerStyle,
} from "../helpers/testHelper";

import { APP_TITLE, ADD_TASK } from "../strings/testStrings";

describe("Test project in the app task list.", () => {
  beforeEach(() => {
    render(<App />);
  });
  it("The user must be able to view the title correctly.", () => {
    const title = screen.getByText(APP_TITLE);
    expect(title).toBeInTheDocument();
  });

  it("User should be able to see if add button name is correct.", () => {
    const addTask = screen.getByTestId(ADD_BUTTON_ID);
    expect(addTask).toHaveTextContent(ADD_TASK);
  });

  it("User should able to enter a task", () => {
    const taskMsg = `Integration test ${Date.now()}`;
    addTask(taskMsg);
    const tasks = screen.getByText(taskMsg);
    expect(tasks).toBeInTheDocument();
  });

  it("User should be able to create tasks with the same names", () => {
    const taskMsg = `Integration test ${Date.now()}`;
    addTask(taskMsg);
    addTask(taskMsg);
    const tasks = screen.getAllByText(taskMsg);
    expect(tasks).toHaveLength(2);
  });

  it("User should be able to delete a task.", () => {
    const taskMsg = `Integration test ${Date.now()}`;
    addTask(taskMsg);
    const task = within(screen.getByTestId(TASK_CONTAINER_ID(taskMsg)));
    const delTask = task.getByTestId(DELETE_TASK_ID);
    userEvent.click(delTask);
    expect(
      screen.queryByTestId(`TASK_CONTAINER_${taskMsg}`)
    ).not.toBeInTheDocument();
  });

  it("User should be able to enter an empty task.", () => {
    const taskMsg = "";
    addTask(taskMsg);
    expect(screen.getByTestId(TASK_CONTAINER_ID(taskMsg))).toBeInTheDocument();
  });

  it("User should be able to complete only the task selected", () => {
    const taskMsg1 = "Test one";
    const taskMsg2 = "Test two";
    addTask(taskMsg1);
    addTask(taskMsg2);

    const task = within(screen.getByTestId(TASK_CONTAINER_ID(taskMsg1)));
    const completeTask = task.getByTestId(TASK_NAME_ID);

    userEvent.click(completeTask);
    checkTaskContainerStyle(taskMsg1, true);
    userEvent.click(completeTask);
    checkTaskContainerStyle(taskMsg1, false);
    userEvent.click(completeTask);
    checkTaskContainerStyle(taskMsg2, false);
  });

  it("User should not be able to open Info if task name is empty.", () => {
    const taskMsg = "";
    addTask(taskMsg);
    const task = within(screen.getByTestId(TASK_CONTAINER_ID(taskMsg)));
    const infoTask = task.getByTestId(INFO_TASK_BUTTON_ID);
    userEvent.click(infoTask);
    expect(screen.queryByTestId(TASK_TITLE_ID)).not.toBeInTheDocument();
  });

  it("User should be able to delete only the task selected.", () => {
    const taskMsg1 = "Test one";
    const taskMsg2 = "Test two";
    addTask(taskMsg1);
    addTask(taskMsg2);
    const task1 = within(screen.getByTestId(TASK_CONTAINER_ID(taskMsg1)));
    const delTask1 = task1.getByTestId(DELETE_TASK_ID);
    userEvent.click(delTask1);

    expect(
      screen.queryByTestId(TASK_CONTAINER_ID(taskMsg1))
    ).not.toBeInTheDocument();
    expect(screen.getByTestId(TASK_CONTAINER_ID(taskMsg2))).toBeInTheDocument();
  });

  it("User should be able to open task details.", () => {
    const taskMsg = `Integration test ${Date.now()}`;
    addTask(taskMsg);
    const task = within(screen.getByTestId(TASK_CONTAINER_ID(taskMsg)));
    const infoTask = task.getByTestId(INFO_TASK_BUTTON_ID);
    userEvent.click(infoTask);
    const backButton = "Back";

    expect(screen.getByTestId(TASK_TITLE_ID)).toHaveTextContent(taskMsg);
    expect(screen.getByTestId(BACK_BUTTON_ID)).toHaveTextContent(backButton);
  });
});
