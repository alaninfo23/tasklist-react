import React from "react";
import { prettyDOM, render, screen, within } from "@testing-library/react";
import App from "../../App";
import userEvent, {} from '@testing-library/user-event';


describe("Testes", () => {
  it("renders app title", () => {
    render(<App />);
    const title = screen.getByText("Minhas Tarefas");
    
    expect(title).toBeInTheDocument();
  });

  it('check that the name of the add button is correct.', () => {
    render(<App />);
    const add_task = screen.getByTestId('ADD_BUTTON');
    
    expect(add_task).toHaveTextContent('Adicionar');
  });
  
  it('check if you are able to enter a task', () => {
    render(<App />);
    const taskMsg = 'testes de integração';
    const input = screen.getByTestId('INPUT_TASK');
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const add_task = screen.getByTestId('ADD_BUTTON');
    userEvent.click(add_task);
    
    const tasks = screen.getByText(taskMsg);
    expect(tasks).toBeInTheDocument();
  });
  
  it('check if it accepts creating tasks with the same names', () => {
    render(<App />);
    const taskMsg = 'testes de integração';
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
    const taskMsg = `testes de integração ${Date.now()}`;

    const input = screen.getByTestId('INPUT_TASK');
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const add_task = screen.getByTestId('ADD_BUTTON');
    userEvent.click(add_task);

    const task = within(screen.getByTestId(`TASK_CONTAINER_${taskMsg}`));
    const del_task = task.getByTestId('DELETE_TASK');
    userEvent.click(del_task);
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
   
    expect(screen.queryByTestId(`TASK_CONTAINER_${taskMsg}`)).toBeInTheDocument();

  });
  
  it('User should be able to complete task', () => {
    render(<App />);
    const taskMsg = `testes de integração ${Date.now()}`;

    const input = screen.getByTestId('INPUT_TASK');
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const addTask = screen.getByTestId('ADD_BUTTON');
    userEvent.click(addTask);
  
    const task = within(screen.getByTestId(`TASK_CONTAINER_${taskMsg}`));    
    const completeTask = task.getByTestId('TASK_NAME')
  
    userEvent.click(completeTask);
    expect((screen.getByTestId(`TASK_CONTAINER_${taskMsg}`))).toHaveStyle({ borderLeft: '6px solid chartreuse'});

    userEvent.click(completeTask);
    expect((screen.getByTestId(`TASK_CONTAINER_${taskMsg}`))).not.toHaveStyle({ borderLeft: '6px solid chartreuse'});
  });

  it('Patient should be able to open task details.', () => {
    render(<App />);
    const taskMsg = `testes de integração ${Date.now()}`;
    const backButtonName = 'Voltar';

    let input = screen.getByTestId('INPUT_TASK');
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const addTask = screen.getByTestId('ADD_BUTTON');
    userEvent.click(addTask);

    const task = within(screen.getByTestId(`TASK_CONTAINER_${taskMsg}`));
    const infoTask = task.getByTestId('INFO_TASK_BUTTON');
    userEvent.click(infoTask);

    expect(screen.getByTestId('TASK_TITLE')).toHaveTextContent(taskMsg);
    const backButton = screen.getByTestId('BACK_BUTTON');
    expect(backButton).toHaveTextContent(backButtonName);
    userEvent.click(backButton);

    //console.log(prettyDOM(screen.));
    //input = screen.findByTestId('INPUT_TASK');
    //expect(input).toBeInTheDocument();

  });

});
