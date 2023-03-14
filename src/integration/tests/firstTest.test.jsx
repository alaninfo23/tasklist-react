import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../../App";
import userEvent, {} from '@testing-library/user-event';

describe("Test project in the app task list.", () => {
  it("The user must be able to view the title correctly.", () => {
    render(<App />);

    const title = screen.getByText("Minhas Tarefas");
    expect(title).toBeInTheDocument();
  });

  it('User should be able to see if add button name is correct.', () => {
    render(<App />);

    const add_task = screen.getByTestId('ADD_BUTTON');
    expect(add_task).toHaveTextContent('Adicionar');
  });
  
  it('User should able to enter a task', () => {
    render(<App />);
    const taskMsg = 'Integration test';
    const input = screen.getByTestId('INPUT_TASK');
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const addTask = screen.getByTestId('ADD_BUTTON');
    userEvent.click(addTask);
    const tasks = screen.getByText(taskMsg);
    expect(tasks).toBeInTheDocument();
  });
  
  it('User should be able to creating tasks with the same names', () => {
    render(<App />);
    const taskMsg = 'Integration test';
    const input = screen.getByTestId('INPUT_TASK');
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const add_task = screen.getByTestId('ADD_BUTTON');
    userEvent.click(add_task);
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    userEvent.click(add_task);
    const tasks = screen.getAllByText(taskMsg);
    expect(tasks).toHaveLength(2);
  });

  it('User should be able to delete a task.', () => {
    render(<App />);
    const taskMsg = `Integration test ${Date.now()}`;

    const input = screen.getByTestId('INPUT_TASK');
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const add_task = screen.getByTestId('ADD_BUTTON');
    userEvent.click(add_task);
    const task = within(screen.getByTestId(`TASK_CONTAINER_${taskMsg}`));
    const delTask = task.getByTestId('DELETE_TASK');
    userEvent.click(delTask);
    expect(screen.queryByTestId(`TASK_CONTAINER_${taskMsg}`)).not.toBeInTheDocument();
  });

  it('User should be able to enter an empty task.', () => {
    render(<App />);

    const taskMsg = '';
    const input = screen.getByTestId('INPUT_TASK');
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const addTask = screen.getByTestId('ADD_BUTTON');
    userEvent.click(addTask);
   
    expect(screen.getByTestId(`TASK_CONTAINER_${taskMsg}`)).toBeInTheDocument();

  });
  
  it('User should be able to complete task', () => {
    render(<App />);
    const taskMsg = `Integration test ${Date.now()}`;

    const input = screen.getByTestId('INPUT_TASK');
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const addTask = screen.getByTestId('ADD_BUTTON');
    userEvent.click(addTask);
    const task = within(screen.getByTestId(`TASK_CONTAINER_${taskMsg}`));    
    const taskName = task.getByTestId('TASK_NAME')
  
    userEvent.click(taskName);
    expect((screen.getByTestId(`TASK_CONTAINER_${taskMsg}`))).toHaveStyle({ borderLeft: '6px solid chartreuse'});

    userEvent.click(taskName);
    expect((screen.getByTestId(`TASK_CONTAINER_${taskMsg}`))).not.toHaveStyle({ borderLeft: '6px solid chartreuse'});
  });

  it('User should be able to open task details.', () => {
    render(<App />);
    const taskMsg = `Integration test ${Date.now()}`;

    let input = screen.getByTestId('INPUT_TASK');
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const addTask = screen.getByTestId('ADD_BUTTON');
    userEvent.click(addTask);
    const task = within(screen.getByTestId(`TASK_CONTAINER_${taskMsg}`));
    const infoTask = task.getByTestId('INFO_TASK_BUTTON');
    userEvent.click(infoTask);
    expect(screen.getByTestId('TASK_TITLE')).toHaveTextContent(taskMsg);
  });

});
