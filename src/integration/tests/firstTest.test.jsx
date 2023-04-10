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
} from "../helpers/testHelper";

import { APP_TITLE, ADD_TASK } from "../strings/testStrings";

describe("Test project in the app task list.", () => {
  it("The user must be able to view the title correctly.", () => {
    render(<App />);
    const title = screen.getByText(APP_TITLE);

    expect(title).toBeInTheDocument();
  });

  it("User should be able to see if add button name is correct.", () => {
    render(<App />);
    const addTask = screen.getByTestId(ADD_BUTTON_ID);

    expect(addTask).toHaveTextContent(ADD_TASK);
  });

  it("User should able to enter a task", () => {
    render(<App />);
    const taskMsg = `Integration test ${Date.now()}`;
    const input = screen.getByTestId(INPUT_TASK_ID);
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const addTask = screen.getByTestId(ADD_BUTTON_ID);
    userEvent.click(addTask);

    const tasks = screen.getByText(taskMsg);
    expect(tasks).toBeInTheDocument();
  });

  it("User should be able to create tasks with the same names", () => {
    render(<App />);

    const taskMsg = `Integration test ${Date.now()}`;
    const input = screen.getByTestId(INPUT_TASK_ID);
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const add_task = screen.getByTestId(ADD_BUTTON_ID);
    userEvent.click(add_task);
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    userEvent.click(add_task);

    const tasks = screen.getAllByText(taskMsg);
    expect(tasks).toHaveLength(2);
  });

  it("User should be able to delete a task.", () => {
    render(<App />);
    const taskMsg = `Integration test ${Date.now()}`;
    const input = screen.getByTestId(INPUT_TASK_ID);
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const add_task = screen.getByTestId(ADD_BUTTON_ID);
    userEvent.click(add_task);
    const task = within(
      screen.getByTestId(`TASK_CONTAINER_${taskMsg}`)
    );
    const delTask = task.getByTestId(DELETE_TASK_ID);

    userEvent.click(delTask);
    expect(
      screen.queryByTestId(`TASK_CONTAINER_${taskMsg}`)
    ).not.toBeInTheDocument();
  });

  it("User should be able to enter an empty task.", () => {
    render(<App />);
    const taskMsg = "";
    const input = screen.getByTestId(INPUT_TASK_ID);
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const addTask = screen.getByTestId(ADD_BUTTON_ID);

    userEvent.click(addTask);
    expect(
      screen.getByTestId(`TASK_CONTAINER_${taskMsg}`)
    ).toBeInTheDocument();
  });

  it("User should be able to complete only the task selected", () => {
    render(<App />);

    const taskMsg1 = "Test one";
    const taskMsg2 = "Test two";

    const input = screen.getByTestId("INPUT_TASK");
    userEvent.clear(input);
    userEvent.type(input, taskMsg1);
    const addTask = screen.getByTestId("ADD_BUTTON");
    userEvent.click(addTask);

    userEvent.clear(input);
    userEvent.type(input, taskMsg2);
    userEvent.click(addTask);

    const task = within(screen.getByTestId(`TASK_CONTAINER_${taskMsg1}`));
    const completeTask = task.getByTestId(TASK_NAME_ID);

    userEvent.click(completeTask);
    expect(screen.getByTestId(`TASK_CONTAINER_${taskMsg1}`)).toHaveStyle({
      borderLeft: "6px solid chartreuse",
    });

    userEvent.click(completeTask);
    expect(screen.getByTestId(`TASK_CONTAINER_${taskMsg1}`)).not.toHaveStyle({
      borderLeft: "6px solid chartreuse",
    });

    userEvent.click(completeTask);
    expect(screen.getByTestId(`TASK_CONTAINER_${taskMsg2}`)).not.toHaveStyle({
      borderLeft: "6px solid chartreuse",
    });
  });

  it("User should not be able to open Info if task name is empty.", () => {
    render(<App />);
    const taskMsg = "";
    const input = screen.getByTestId(INPUT_TASK_ID);
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const addTask = screen.getByTestId(ADD_BUTTON_ID);
    userEvent.click(addTask);
    const task = within(
      screen.getByTestId(`TASK_CONTAINER_${taskMsg}`)
    );
    const infoTask = task.getByTestId(INFO_TASK_BUTTON_ID);
    userEvent.click(infoTask);

    expect(screen.queryByTestId(TASK_TITLE_ID)).not.toBeInTheDocument();
  });

  it("User should be able to delete only the task selected.", () => {
    render(<App />);
    const taskMsg1 = "Test one";
    const taskMsg2 = "Test two";
    const input = screen.getByTestId(INPUT_TASK_ID);
    userEvent.clear(input);
    userEvent.type(input, taskMsg1);
    const addTask = screen.getByTestId(ADD_BUTTON_ID);
    userEvent.click(addTask);
    userEvent.clear(input);
    userEvent.type(input, taskMsg2);
    userEvent.click(addTask);
    const task1 = within(
      screen.getByTestId(`TASK_CONTAINER_${taskMsg1}`)
    );
    const delTask1 = task1.getByTestId(DELETE_TASK_ID);
    userEvent.click(delTask1);

    expect(
      screen.queryByTestId(`TASK_CONTAINER_${taskMsg1}`)
    ).not.toBeInTheDocument();
    expect(
      screen.getByTestId(`TASK_CONTAINER_${taskMsg2}`)
    ).toBeInTheDocument();
  });

  it("User should be able to open task details.", () => {
    render(<App />);
    const taskMsg = `Integration test ${Date.now()}`;
    const input = screen.getByTestId(INPUT_TASK_ID);
    const backButton = "Back";
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const addTask = screen.getByTestId(ADD_BUTTON_ID);
    userEvent.click(addTask);
    const task = within(
      screen.getByTestId(`TASK_CONTAINER_${taskMsg}`)
    );
    const infoTask = task.getByTestId(INFO_TASK_BUTTON_ID);
    userEvent.click(infoTask);

    expect(screen.getByTestId(TASK_TITLE_ID)).toHaveTextContent(
      taskMsg
    );
    expect(screen.getByTestId(BACK_BUTTON_ID)).toHaveTextContent(backButton);
  });
});
