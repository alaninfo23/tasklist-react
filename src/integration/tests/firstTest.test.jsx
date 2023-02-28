import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent, {} from '@testing-library/user-event';


describe("Testes", () => {
  it.only("renders app title", () => {
    render(<App />);

    const title = screen.getByText("Minhas Tarefas");
    expect(title).toBeInTheDocument();
  });

  it('renders a input', () => {
    render(<App />);

    const input = screen.getByTestId();
    userEvent.clear(input);
    userEvent.type(input, 'testes de integração');
    userEvent.click('ADD_BUTTON');

    const add = screen.getByTestId('ADD_BUTTON');
    expect(add).toBeInTheDocument();

  });
  
});
