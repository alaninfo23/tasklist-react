import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../../App";
import userEvent, {} from '@testing-library/user-event';


describe("Testes", () => {
  it("renders app title", () => {
    render(<App />);
    const title = screen.getByText("Minhas Tarefas");
    /* Espero que o titulo Minhas Tarefas esteja no documento*/
    expect(title).toBeInTheDocument();
  });

  it('check that the name of the add button is correct.', () => {
    render(<App />);
    const add_task = screen.getByTestId('ADD_BUTTON');
    /* Espero que o botão tenha o nome Adicionar */
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
    //eu quero validar se a tarefa testes de integração foi adicionada na tela??
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

  it('validate if it is possible to delete a task.', () => {
    render(<App />);
    const taskMsg = `testes de integração ${Date.now()}`;

    const input = screen.getByTestId('INPUT_TASK');
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const add_task = screen.getByTestId('ADD_BUTTON');
    userEvent.click(add_task);
    //userEvent.click(del_task[0]);
    //const test = test1.indexOf(del_task.toHaveTextContent)
    const task = within(screen.getByTestId(`TASK_CONTAINER_${taskMsg}`));
    const del_task = task.getByTestId('DELETE_TASK');
    userEvent.click(del_task);
    expect(screen.queryByTestId(`TASK_CONTAINER_${taskMsg}`)).not.toBeInTheDocument();
  });

  it('validate if click button info it will show the back button and the title with task name.', () => {
     render(<App />);
     const taskMsg = `testes de integração ${Date.now()}`;
     const button_back = 'Voltar'

     const input = screen.getByTestId('INPUT_TASK');
     userEvent.clear(input);
     userEvent.type(input, taskMsg);
     const add_task = screen.getByTestId('ADD_BUTTON');
     userEvent.click(add_task);
     
     //se colocar o ADD_BUTTON antes do within, o teste passa.
     //expect(screen.getByTestId('ADD_BUTTON')).toHaveTextContent('Adicionar');
     const task = within(screen.getByTestId(`TASK_CONTAINER_${taskMsg}`));
     const info_task = task.getByTestId('INFO_TASK');
     userEvent.click(info_task);
     //expect(screen.queryByTestId(`TASK_CONTAINER_${taskMsg}`)).toBeInTheDocument();
     //const backButton = task.getByTestId('BACK-BUTTON');
     //expect(backButton).toHaveTextContent('Voltar');
     expect(screen.getByTestId('TASK_TITLE')).toHaveTextContent(taskMsg);
     expect(screen.getByTestId('BACK_BUTTON')).toHaveTextContent(button_back);

  })


});
