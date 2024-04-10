import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../pages/home/home';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { SoundProvider } from '../sounds/soundContext';
import Home from '@mui/icons-material/Home';

test('Home Screen Renders: TC01', () => {
    render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
  const necessaryText = screen.getByText(/Peace Process Puzzle Game/i);
  expect(necessaryText).toBeInTheDocument();
});

test('Page displays options correctly: TC02', () => {
  const { container } = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

    const settingsIcon = container.querySelector('.settings-icon-home');
    expect(screen.getByText(/Start Puzzle/i)).toBeInTheDocument();
    expect(screen.getByText(/Museum Of The Troubles and Peace Process Home Page/i)).toBeInTheDocument();
    expect(settingsIcon).toBeInTheDocument();
  });

  test('Settings Dialog Opened When Settings Icon Clicked', async () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <HomePage />
        </SoundProvider>
      </MemoryRouter>
    );
  
   // simulate the click.
    const settingsIcon = await screen.getByLabelText(/SettingsIcon/i);
    fireEvent.click(settingsIcon);

    const settingsDialogContent = await screen.findByText(/Admin/);
    expect(settingsDialogContent).toBeInTheDocument();
  });

  test('Settings Dialog Can Be Closed', async () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <HomePage />
        </SoundProvider>
      </MemoryRouter>
    );
  
    // simulate the click.
    const settingsIcon = await screen.getByLabelText(/SettingsIcon/i);
    fireEvent.click(settingsIcon);

    const closeButton = screen.getByRole('button', { name: 'closeSettings' });
    fireEvent.click(closeButton)

    expect(screen.queryByLabelText('Settings-Dialog')).not.toBeInTheDocument();
  });

  test('Clicking the `Play Game` button navigates to the pre-game-info page: TC04', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  
    const preGameInfoLink = screen.getByRole('link', { name: 'PreGameInfo' });
  
    // User clicking the link
    await act(async () => {
      await userEvent.click(preGameInfoLink);
    });
  
    expect(preGameInfoLink).toHaveAttribute('href', expect.stringContaining('pre-game-info'));
  });

  test('The museum website is opened in a new tab when clicked: TC05', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const museumLink = screen.getByText(/Museum Of The Troubles and Peace Process Home Page/i).closest('a');
    expect(museumLink).toHaveAttribute('href', 'http://museumofthetroubles.org/');
    expect(museumLink).toHaveAttribute('target', '_blank');
  });
  


  


