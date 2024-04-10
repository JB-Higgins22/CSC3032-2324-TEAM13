import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/login/login';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { SoundProvider } from '../sounds/soundContext';

test('Login Screen Renders: TC01', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const loginForm = screen.getByLabelText(/login-form/i);
  expect(loginForm).toBeInTheDocument();
});


test('Settings Dialog Opened When Settings Icon Clicked', async () => {
  render(
    <MemoryRouter>
      <SoundProvider>
        <Login />
      </SoundProvider>
    </MemoryRouter>
  );

  // simulate the click.
  const settingsIcon = await screen.getByLabelText(/settings-icon/i);
  fireEvent.click(settingsIcon);

  const settingsDialogContent = await screen.findByText(/Admin/);
  expect(settingsDialogContent).toBeInTheDocument();
});

test('Settings Dialog Can Be Closed', async () => {
  render(
    <MemoryRouter>
      <SoundProvider>
        <Login />
      </SoundProvider>
    </MemoryRouter>
  );

  // simulate the click.
  const settingsIcon = await screen.getByLabelText(/settings-icon/i);
  fireEvent.click(settingsIcon);

  const closeButton = screen.getByRole('button', { name: 'closeSettings' });
  fireEvent.click(closeButton)

  expect(screen.queryByLabelText('Settings-Dialog')).not.toBeInTheDocument();
});

test('Home Dialog Opened When Home Icon Clicked', async () => {
  render(
    <MemoryRouter>
      <SoundProvider>
        <Login />
      </SoundProvider>
    </MemoryRouter>
  );

  // simulate the click.
  const homeIcon = await screen.getByLabelText(/home-icon/i);
  fireEvent.click(homeIcon);

  const linkElement = screen.getByRole('link', { name: /Quit/i });
  expect(linkElement).toBeInTheDocument();

  fireEvent.click(linkElement);
  expect(window.location.pathname).toBe("/");
});

test('Home Dialog Can Be Closed', async () => {
  render(
    <MemoryRouter>
      <SoundProvider>
        <Login />
      </SoundProvider>
    </MemoryRouter>
  );

  // simulate the click.
  const homeIcon = await screen.getByLabelText(/home-icon/i);
  fireEvent.click(homeIcon);

  const closeButton = screen.getByRole('button', { name: 'closeConfirmQuit' });
  fireEvent.click(closeButton)

  expect(screen.queryByLabelText('Confirm-Quit-Dialog')).not.toBeInTheDocument();
});

