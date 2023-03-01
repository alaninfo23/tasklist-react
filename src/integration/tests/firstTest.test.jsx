import React from "react";
import { render, screen } from "@testing-library/react";
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

  it.skip('validar se quando deleto uma tarefa ela está sumindo da lista', () => {
    render(<App />);
    const taskMsg = 'testes de integração';

    const input = screen.getByTestId('INPUT_TASK');
    userEvent.clear(input);
    userEvent.type(input, taskMsg);
    const add_task = screen.getByTestId('ADD_BUTTON');
    userEvent.click(add_task);

    const del_task = screen.getAllByTestId('DELETE_TASK');
    //userEvent.click(del_task[0]);
    //const test = test1.indexOf(del_task.toHaveTextContent)
    const tasks = screen.getByText(taskMsg);
    expect(tasks).not.toBeInTheDocument();
  });


});
