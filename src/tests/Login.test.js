import React from 'react'
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';


describe('Testando a página de Login', () => {
  it('Verificando se o input de email, nome e botão aparecem na tela', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const buttonInput = screen.getByTestId('btn-play');

    expect(emailInput).toBeDefined();
    expect(nameInput).toBeDefined();
    expect(buttonInput).toBeDefined();
  });
  it('Verificando a funcionalidade de habilitar e desabilitar o botão', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const buttonInput = screen.getByTestId('btn-play');

    expect(buttonInput).toBeDisabled();

    userEvent.type(emailInput, 'felipe@hotmail.com');
    userEvent.type(nameInput, 'felipe');

    expect(buttonInput).not.toBeDisabled();
  });
  it('Verificando se ao clicar no botão a rota muda', async() => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const buttonInput = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'felipe@hotmail.com');
    userEvent.type(nameInput, 'felipe');
    userEvent.click(buttonInput);

    await screen.findByText('Carregando...');

    const { location } = history;

    expect(location.pathname).toBe('/game');

  });
  it('Verificando se tem o botão que encaminha para a page settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const configButton = screen.getByTestId('btn-settings');

    expect(configButton).toBeVisible();
    expect(configButton).toBeEnabled();
    userEvent.click(configButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });
});