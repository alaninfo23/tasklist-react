/* Importando biblioteca de renderização e screen(para localizar textos) */
import { render, screen } from "@testing-library/react";
/* Importando a lib userEvent para interagir com o input */
//import userEvent, {} from '@testing-library/user-event';
/* Importando a função Checknumber do diretório atual*/
import { App } from ".";

describe('Tasklist', () => {
    test('renders a title', () => {
        render(<App />)
        const title = screen.getByText('Minhas Tarefas');
        expect(title).toBeInTheDocument();
    });
});