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
    expect(add_task).toHaveTextContent('Adicionar')
  });

  it('renders a input', () => {
    render(<App />);
    const input = screen.getByTestId('INPUT_TASK');
    userEvent.clear(input);
    userEvent.type(input, 'testes de integração');
    const add_task = screen.getByTestId('ADD_BUTTON');
    userEvent.click(add_task);
    //eu quero validar se a tarefa testes de integração foi adicionada na tela??
    const tasks = screen.getByText('testes de integração');
    expect(tasks).toBeInTheDocument();
  });
  
  it('verificar se aceita criar tarefas com nomes iguais', () => {
    render(<App />);
    const input = screen.getByTestId('INPUT_TASK');
    userEvent.clear(input);
    userEvent.type(input, 'testes de integração');
    const add_task = screen.getByTestId('ADD_BUTTON');
    userEvent.click(add_task);

    userEvent.clear(input);
    userEvent.type(input, 'testes de integração');
    userEvent.click(add_task);

    const tasks = screen.getAllByText('testes de integração');
    expect(tasks).toHaveLength(2);
  });

});
