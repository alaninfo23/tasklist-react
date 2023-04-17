import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const INPUT_TASK_ID = 'INPUT_TASK';
export const ADD_BUTTON_ID = 'ADD_BUTTON';
export const TASK_NAME_ID = 'TASK_NAME';
export const TASK_TITLE_ID = 'TASK_TITLE';
export const INFO_TASK_BUTTON_ID = 'INFO_TASK_BUTTON';
export const BACK_BUTTON_ID = 'BACK_BUTTON';
export const DELETE_TASK_ID = 'DELETE_TASK';

export const TASK_CONTAINER_ID = (taskMsg) => `TASK_CONTAINER_${taskMsg}`;

export const addTask = (taskMsg) => {
    const input = screen.getByTestId(INPUT_TASK_ID);
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const addTask = screen.getByTestId(ADD_BUTTON_ID);
    userEvent.click(addTask);
}

export function addTask2(taskMsg) {
    const input = screen.getByTestId(INPUT_TASK_ID);
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const addTask = screen.getByTestId(ADD_BUTTON_ID);
    userEvent.click(addTask);
}

export function checkTaskContainerStyle(taskMsg1, completeStyle) {
    const taskContainer = screen.queryByTestId(TASK_CONTAINER_ID(taskMsg1));
    if (completeStyle) {
      expect(taskContainer).toHaveStyle('borderLeft: 6px solid chartreuse');
    } else {
      expect(taskContainer).not.toHaveStyle('borderLeft: 6px solid chartreuse');
    }
  }