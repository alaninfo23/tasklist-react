import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";

describe("First test", () => {
  it("testing", () => {
    render(<App />);

    const title = screen.getByText("Minhas Tarefas");
    expect(title).toBeInTheDocument();
  });
});
